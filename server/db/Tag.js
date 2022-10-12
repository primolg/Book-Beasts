const db = require("./db");
const { Sequelize } = db;

const Tag = db.define("tag", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
});

module.exports = Tag;
