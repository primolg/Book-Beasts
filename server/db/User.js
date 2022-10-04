const db = require("./db");
const { Sequelize } = db;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = db.define("user", {
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
            len: [4, 32],
        }
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [4, 32],
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [4, 32],
        }
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
});

// authentication

module.exports = User;
