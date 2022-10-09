const db = require("./db");
const { Sequelize } = db;
const { Op } = require("sequelize");

const Page = db.define("page", {
    content: {
        type: Sequelize.TEXT,
    },
    image: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true,
        }
    },
    type: {
        type: Sequelize.STRING,
    },
    // page order kept with doubly linked list
    previousPage: Sequelize.INTEGER,
    nextPage: Sequelize.INTEGER,
    // 'isFirstPage' might make the linked list easier to handle in queries
    isFirstPage: {
        type: Sequelize.VIRTUAL,
        get() {
            return this.previousPage ? false : true;
        },
    },
    // 'isLastPage' may not be necessary - we can remove it later if we end up not needing it
    isLastPage: {
        type: Sequelize.VIRTUAL,
        get() {
            return this.nextPage ? false : true;
        },
    },
});

// steps to insert into linked list:
// 1: link prev/next on the node we are inserting
// 2: save the node AFTER where we are inserting
// 3: update 'nextNode' on previous and 'previousNode' on next
// 4: update previous/next on our node

// call this on the page that you want to insert
// 'pageId' is the page you want to insert it after
Page.prototype.insertAfter = async function (pageId) {
    try {
        // 1 - update previous/next on the node we are moving
        await Page.update(
            { previousPage: this.previousPage },
            { where: { id: this.nextPage }}
        );
        await Page.update(
            { nextPage: this.nextPage },
            { where: { id: this.previousPage }}
        )

        // 2 - update the node after insertion point
        const previousPage = await Page.findByPk(pageId);
        const nextPage = await Page.findByPk(previousPage.nextPage);
        await nextPage.set({ previousPage: this.id });
        await nextPage.save();

        // 3 - update the node before insertion point
        await previousPage.set({ nextPage: this.id });
        await previousPage.save();

        // 4 - update prev/next on current node
        await this.set({
            previousPage: previousPage.id,
            nextPage: nextPage.id
        })
        await this.save();
    } catch (error) {
        console.error("Error");
        // console.error(error);
    }
}

module.exports = Page;
