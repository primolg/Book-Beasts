const db = require("./db");
const { Sequelize } = db;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Child = db.define("child" , {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: [4, 32],
            isAlphanumeric: true,
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [8, 32],
        }
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 32],
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 32],
        }
    },
    age: {
        type: Sequelize.INTEGER,
        validate: {
            min: 4,
            max: 12,
        },
    },
    color: {
        // identifier for parent
        type: Sequelize.STRING,
    },
});

// authentication

module.exports = Child;
