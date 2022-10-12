const db = require("./db");
const { Sequelize } = db;

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

Book.prototype.getOrderedPages = async function() {
    const allPages = await this.getPages();
    const firstPage = allPages.find(page => page.isFirstPage);
    const orderedPages = [firstPage];

    for (let i = 0; i < allPages.length; i++) {
        const nextPage = allPages.find(page => page.id === orderedPages[i].nextPage);
        orderedPages.push(nextPage);
    }
    return orderedPages;
}

Book.prototype.addNewPage = async function() {

}

Book.prototype.removeOnePage = async function() {

}

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
