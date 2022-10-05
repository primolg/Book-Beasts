const db = require("./db");
const { Sequelize } = db;

const Page = db.define("page", {
    content: {
        type: Sequelize.TEXT,
    },
    image: {
        type: Sequelize.STRING,
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

// 'pageId' parameter refers to the page being inserted
// will need to add 'insertBefore' or modify this function later on
Page.prototype.insertAfter = async function (pageId) {
    try {
        // update 'previous page' on nextPage
        await Page.update(
            { previousPage: pageId },
            { where: { id: this.nextPage }}
        );
        // update both page refs on the inserted page
        await Page.update(
            { 
                previousPage: this.id,
                nextPage: this.nextPage,
            },
            { where: { id: pageId }}
        );
        // update 'next page' on this page
        await this.update({ nextPage: pageId });
    } catch (error) {
        console.error(error);
    }
}

module.exports = Page;
