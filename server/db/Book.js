const db = require("./db");
const { Sequelize } = db;
const Page = require("./Page");

const Book = db.define("book", {
    title: {
        type: Sequelize.STRING,
        defaultValue: "Untitled",
    },
    coverArt: {
        type: Sequelize.STRING,
        defaultValue: 'https://res.cloudinary.com/ddqp7dojc/image/upload/v1665424523/capstone/book-covers-big-2019101610_nlctt9.jpg',
        validate: {
            isUrl: true,
        },
    },
    isPublished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    isFeatured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    totalPages: {
        type: Sequelize.INTEGER,
        defaultValue: 2,
    },
    genre: {
        type: Sequelize.STRING,
    },
    createdAt: {
        type: Sequelize.DATEONLY,
        field: "created_at",
    },
    updatedAt: {
        type: Sequelize.DATEONLY,
        field: "updated_at",
    },
    studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

Book.prototype.getOrderedPages = async function() {
    const allPages = await this.getPages();
    const firstPage = allPages.find(page => page.isFirstPage);
    const orderedPages = [firstPage];

    // can implement page numbers here

    for (let i = 1; i < allPages.length; i++) {
        const nextPage = allPages.find(page => page.id === orderedPages[i-1].nextPage);
        orderedPages.push(nextPage);
    }
    return orderedPages;
}

Book.prototype.createNewPage = async function() {
    // *temporary* work around for hard-coded seed ids
    const newPageId = (await Page.max('id')) + 1;

    const newPage = await this.createPage({
        id: newPageId,
        studentId: this.studentId,
    });
    await newPage.insertEnd();

    await this.set({
        totalPages: this.totalPages + 1,
    });
    await this.save();
    
    return newPage;
}

// might be better to use 'beforeDestroy' hook on page model
Book.prototype.deletePage = async function(pageId) {
    const page = await Page.findByPk(pageId);
    if (page.nextPage) {
        await Page.update(
            { previousPage: page.previousPage },
            { where: { id: page.nextPage }}
        );
    }
    if (page.previousPage) {
        await Page.update(
            { nextPage: page.nextPage },
            { where: { id: page.previousPage }}
        );
    }
    await this.set({
        totalPages: this.totalPages - 1,
    });
    await this.save();

    await page.destroy();
    return (this);
}

// constructs a basic linked list of 2 pages for a new book
Book.afterCreate(async (book) => {
    // *temporary* work around for hard-coded seed ids
    const firstId = (await Page.max('id')) + 1;
    const secondId = firstId + 1;

    const page1 = await book.createPage({
        id: firstId,
        nextPage: secondId,
        studentId: book.studentId,
    });
    const page2 = await book.createPage({
        id: secondId,
        previousPage: firstId,
        studentId: book.studentId,
    });
});

Book.beforeDestroy(async (book) => {
    const pages = await book.getPages();
    for (let i = 0; i < pages.length; i++) {
        await pages[i].destroy();
    };
});

module.exports = Book;
