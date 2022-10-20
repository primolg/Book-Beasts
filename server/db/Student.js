const db = require("./db");
const { Sequelize } = db;
const {
    hashPassword,
    authenticate,
    generateToken,
    findByToken,
} = require("./utils");

const Student = db.define("student" , {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
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
        // validate: {
        //     len: [8, 32],
        // }
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
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
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

Student.beforeCreate((student) => hashPassword(student));
Student.beforeUpdate((student) => hashPassword(student));
Student.authenticate = authenticate(Student);
Student.findByToken = findByToken(Student);
Student.prototype.generateToken = generateToken;

module.exports = Student;
