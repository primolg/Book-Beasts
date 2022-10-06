const db = require("./db");
const generateDummyData = require("./seed");
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
        console.log("Connected to database!");
        
        // still need to seed tags (for testing filtering);
        const { users, students, books, pages } = generateDummyData();

        await Promise.all(users.map(user => User.create(user)));
        await Promise.all(students.map(student => Student.create(student)));
        await Promise.all(books.map(book => Book.create(book)));
        await Promise.all(pages.map(page => Page.create(page)));

        console.log("Seeding data complete\n");
    } catch (error) {
        console.error("Seeding database failed:", error);
    }
};

module.exports = {
    syncAndSeed,
    db,
    User,
    Student,
    Book,
    Page,
    Tag,
};
