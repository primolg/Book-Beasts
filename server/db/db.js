const Sequelize = require('sequelize');
const config = {
    logging: false,
};

const db = new Sequelize(
    process.env.DATABASE_URL || `postgres://localhost:5432/book-beast`,
    config
);

module.exports = db;
