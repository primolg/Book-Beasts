const db = require("./db");
const { Sequelize } = db;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();

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
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
});

// hash password before entering user into db
User.beforeCreate(async (user) => {
    try {
        user.password = await bcrypt.hash(user.password, 10);
    } catch (error) {
        console.error(error)   ;
    }
})

// authentication
User.authenticate = async ({ key, password }) => {
    try {
        let user;
        if (key.includes("@")) {
            user = await User.findOne({
                where: { email: key }
            });
        } else {
            user = await User.findOne({
                where: { username: key }
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user/*.dataValues*/.password);
        if (isPasswordValid) {
            console.log("User successfully authenticated");
            return user;
        } else {
            console.log("Password invalid");
            return;
        }
    } catch (error) {
        console.error(error);
    }
}

User.prototype.generateToken = function() {
    try {
        return jwt.sign({ id: this.id }, process.env.JWT_KEY);
    } catch (error) {
        console.error(error);
    }
}

User.findByToken() = async (token) => {
    try {
        const { id } = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findByPk(id);
        if (user) {
            return user;
        } else {
            throw new Error("Invalid token");
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = User;
