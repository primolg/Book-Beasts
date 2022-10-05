const data = require("./seed");
const db = require("./db");
// models
const User = require("./User");
const Student = require("./Student");
const Book = require("./Book");
const Page = require("./Page");
const Tag = require("./Tag");

User.hasMany(Student);
Student.belongsTo(User);

Student.hasMany(Book);
Book.belongsTo(Student);

Student.hasMany(Page);
Page.belongsTo(Student);

Page.belongsTo(Book);
Book.hasMany(Page);

Tag.belongsToMany(Book, { through: 'bookTags' });
Book.belongsToMany(Tag, { through: 'bookTags' });

const syncAndSeed = async () => {
    try {
        await db.sync({ force: true });

    } catch (error) {
        console.error("Seeding database failed:", error)
    }
    
};

module.exports = syncAndSeed;
