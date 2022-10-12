const Sequelize = require('sequelize');
const db = require('./db');
const Book = require('./Book');
const Tag = require('./Tag');

const BookTag = db.define('booktag', {
    bookId: {
        type: Sequelize.INTEGER,
        references: {
          model: Book,
          key: 'id'
        }
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: {
          model: Tag,
          key: 'id'
        }
      },
});

module.exports = BookTag;