const db = require("./db");
const { Sequelize } = db;

const Book = db.define("book", {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    coverArt: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true,
        }
    },
    isPublished: {
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

module.exports = Book;
