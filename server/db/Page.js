const db = require("./db");
const { Sequelize } = db;

const Page = db.define("page", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: Sequelize.TEXT,
    },
    image: {
        type: Sequelize.STRING,
        defaultValue: 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1665439674/capstone/insertImage_vubntn.jpg',
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

//=== PAGE PROTOTYPE METHODS === //
// 1 - update previous/next on the node being moved
// 2/3 - update nodes before/after insertion point
// 4 - update previous + next on current node

// functions for inserting as first/last page
Page.prototype.insertFirst = async function () {
    // 1 
    await Page.update(
        { previousPage: this.previousPage },
        { where: { id: this.nextPage }}
    );
    await Page.update(
        { nextPage: this.nextPage },
        { where: { id: this.previousPage }}
    );

    // 2/3 (only a node after this on - none before)
    // Page.update(
    //     { previousPage: this.id },
    //     { where: {
    //         previousPage: null,
    //         bookId: this.bookId,
    //     }}
    // );
    const book = await this.getBook();
    const previousFirstPage = await book.getPages({
        where: { previousPage: null }
    });
    await previousFirstPage[0].set({
        previousPage: this.id,
    });
    await previousFirstPage[0].save();

    // 4
    await this.set({
        previousPage: null,
        nextPage: previousFirstPage.id,
    });
    this.save();
}
Page.prototype.insertLast = async function () {

}

// call this on the page that you want to insert, param 'page' is the page it will be after
Page.prototype.insertAfter = async function (page) {
    try {
        // 1 - update previous/next on the node we are moving
        if (this.nextPage) {
            await Page.update(
                { previousPage: this.previousPage },
                { where: { id: this.nextPage }}
            );
        }
        if (this.previousPage) {
            await Page.update(
                { nextPage: this.nextPage },
                { where: { id: this.previousPage }}
            );
        }

        const previousPage = await Page.findByPk(page.id);
        const nextPage = await Page.findByPk(previousPage.nextPage);
        // 2 - update the node before insertion point
        await previousPage.set({ nextPage: this.id });
        await previousPage.save();
        
        // 3 - update the node after insertion point
        await nextPage.set({ previousPage: this.id });
        await nextPage.save();

        // 4 - update prev/next on current node
        if (previousPage) await this.set({
            previousPage: previousPage.id,
        });

        if (nextPage) await this.set({
            nextPage: nextPage.id
        });
        await this.save();
    } catch (error) {
        console.error("Unable to reorder pages:", error);
    }
}

const PageSpecialMethods = [
    '_customGetters',
    '_customSetters',
    'validators',
    '_hasCustomGetters',
    '_hasCustomSetters',
    'rawAttributes',
    '_isAttribute',
    'insertAfter',
    'getStudent',
    'setStudent',
    'createStudent',
    'getBook',
    'setBook',
    'createBook'
]

module.exports = Page;
