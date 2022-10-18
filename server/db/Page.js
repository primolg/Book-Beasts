const db = require("./db");
const { Sequelize } = db;
const { Op } = require("sequelize");

const Page = db.define("page", {
    content: {
        type: Sequelize.TEXT,
    },
    image: {
        type: Sequelize.STRING,
        defaultValue: 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1665439674/capstone/insertImage_vubntn.jpg',
        validate: {
            isUrl: true,
        },
    },
    templateId: { // templateId: currently 1-4
        type: Sequelize.INTEGER,
        defaultValue: 1,
    },
    previousPage: Sequelize.INTEGER,
    nextPage: Sequelize.INTEGER,
    isFirstPage: {
        type: Sequelize.VIRTUAL,
        get() {
            return this.previousPage ? false : true;
        },
    },
    isLastPage: {
        type: Sequelize.VIRTUAL,
        get() {
            return this.nextPage ? false : true;
        },
    },
});

// later should consolidate step 1 into a separate fn, since all methods use it
// might also be able to consolidate insert(First/Last) into one fn

Page.prototype.insertStart = async function () {
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

    const originalFirstPage = await Page.findOne({
        where: {
            bookId: this.bookId,
            previousPage: null,
        },
    });
    await originalFirstPage.set({
        previousPage: this.id,
    });
    await originalFirstPage.save();

    await this.set({
        previousPage: null,
        nextPage: originalFirstPage.id,
    });
    await this.save();
}

Page.prototype.insertEnd = async function () {
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

    const originalLastPage = await Page.findOne({
        where: {
            bookId: this.bookId,
            nextPage: null,
            previousPage: {
                [Op.not]: null,
            },
        },
    });
    await originalLastPage.set({
        nextPage: this.id,
    });
    await originalLastPage.save();

    await this.set({
        previousPage: originalLastPage.id,
        nextPage: null,
    });
    await this.save();
}

Page.prototype.insertAfter = async function (page) {
    try {
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

        await previousPage.set({ nextPage: this.id });
        await previousPage.save();
        await nextPage.set({ previousPage: this.id });
        await nextPage.save();

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

module.exports = Page;
