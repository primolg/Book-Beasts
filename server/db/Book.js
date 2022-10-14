const db = require("./db");
const { Sequelize } = db;
const Page = require("./Page");

const Book = db.define("book", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
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
    },
    genre: {
        type: Sequelize.STRING,
    },
});

// function filterPages(pages){
//     console.log(pages)
//     let orderedPages = [];
//     let currentPage = pages.filter((page) => page.isFirstPage);
//     orderedPages.push({pageNumber: 1, page : currentPage[0]});

//     let counter = 0;
//     while(orderedPages.length < pages.length){
//         console.log(counter)
//         let nextPage = pages.filter((page) => page.id == orderedPages[counter].page.nextPage);
//         orderedPages.push({pageNumber: (counter + 2), page : nextPage[0]});
//         counter++;
//     }
//     return orderedPages;
// }

Book.prototype.getOrderedPages = async function() {
    const allPages = await this.getPages();
    const firstPage = allPages.find(page => page.isFirstPage);
    const orderedPages = [firstPage];

    // implement page numbers

    for (let i = 1; i < allPages.length; i++) {
        const nextPage = allPages.find(page => page.id === orderedPages[i-1].nextPage);
        orderedPages.push(nextPage);
    }
    return orderedPages;
}

Book.prototype.createNewPage = async function() {
    // ***temporary*** work around for hard-coded seed ids
    const newPageId = (await Page.max('id')) + 1;

    // create new page, add to end
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

Book.prototype.deletePage = async function(page) {
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
}

// constructs a basic linked list of 2 pages for a new book
Book.afterCreate(async (book) => {
    // ***temporary*** work around for hard-coded seed ids
    const firstId = (await Page.max('id')) + 1;
    const secondId = firstId + 1;

    // can change number of starting pages if needed
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
    await book.set({
        totalPages: 2,
    });
    await book.save();

    // console.log(`page1 id: ${page1.id} | page1 prev/next: ${page1.previousPage}, ${page1.nextPage}`);
    // console.log(`page2 id: ${page2.id} | page2 prev/next: ${page2.previousPage}, ${page2.nextPage}`);
});

Book.beforeDestroy(async (book) => {
    const pages = await book.getPages();
    for (let i = 0; i < pages.length; i++) {
        await pages[i].destroy();
    }
});

const BookSpecialMethods = [
    '_customGetters',    '_customSetters',
    'validators',        '_hasCustomGetters',
    '_hasCustomSetters', 'rawAttributes',
    '_isAttribute',      'getStudent',
    'setStudent',        'createStudent',
    'getPages',          'countPages',
    'hasPage',           'hasPages',
    'setPages',          'addPage',
    'addPages',          'removePage',
    'removePages',       'createPage',
    'getTags',           'countTags',
    'hasTag',            'hasTags',
    'setTags',           'addTag',
    'addTags',           'removeTag',
    'removeTags',        'createTag'
]

module.exports = Book;
