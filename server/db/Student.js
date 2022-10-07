const db = require("./db");
const { Sequelize } = db;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Student = db.define("student" , {
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
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
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

module.exports = Student;
