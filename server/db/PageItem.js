const Sequelize = require('sequelize');
const db = require('./db');
const Book = require('./Book');
const Page = require('./Page');

const PageItem = db.define('pageitem', {
    bookId: {
        type: Sequelize.INTEGER,
        references: {
            model: Book,
            key: 'id'
        }
    },
    pageId: {
        type: Sequelize.INTEGER,
        references: {
            model: Page,
            key: 'id'
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
            min:0
        }
    },
});

module.exports = PageItem;