const db = require("./db");
const {
  users,
  students,
  books,
  pages,
  tags,
  bookTags,
} = require("./seed.json");

// models
const User = require("./User");
const Student = require("./Student");
const Book = require("./Book");
const Page = require("./Page");
const Tag = require("./Tag");

// relations
User.hasMany(Student);
Student.belongsTo(User);

Student.hasMany(Book);
Book.belongsTo(Student);

Student.hasMany(Page);
Page.belongsTo(Student);

Page.belongsTo(Book);
Book.hasMany(Page);

Tag.belongsToMany(Book, { through: "bookTags" });
Book.belongsToMany(Tag, { through: "bookTags" });

// seeding
const createBookTag = async (bookTag) => {
  const book = await Book.findByPk(bookTag.bookId);
  const tag = await Tag.findByPk(bookTag.tagId);
  return await book.addTag(tag);
};

const syncAndSeed = async (closeConn=false) => {
  try {
    await db.sync({ force: true });
    console.log("Connected to database!");

    await Promise.all(users.map((user) => User.create(user)));
    await Promise.all(students.map((student) => Student.create(student)));
    await Promise.all(books.map((book) => Book.create(book)));
    await Promise.all(pages.map((page) => Page.create(page)));
    await Promise.all(tags.map((tag) => Tag.create(tag)));
    await Promise.all(bookTags.map((bookTag) => createBookTag(bookTag)));

    console.log(
      `Seeding Successful!`
      //"User Special Methods: ", Object.keys(User.prototype),
      //"Student Special Methods: ", Object.keys(Student.prototype),
      //"Book Special Methods: ", Object.keys(Book.prototype),
      //"Page Special Methods: ", Object.keys(Page.prototype),
      //"PageItem Special Methods: ", Object.keys(PageItem.prototype)
    );
    if (closeConn) await db.close();
  } catch (error) {
    console.error("Seeding database failed:", error);
  }
};

if (require.main === module) {
  syncAndSeed(true);
}

module.exports = {
  db,
  syncAndSeed,
  User,
  Student,
  Book,
  Page,
  Tag,
};
