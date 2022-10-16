const db = require("./db");
const { Sequelize } = db;

const Book = db.define("book", {
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
    createdAt: {
        type: Sequelize.DATEONLY,
        field: "created_at",
    },
    updatedAt: {
        type: Sequelize.DATEONLY,
        field: "updated_at",
    },
});

module.exports = Book;
