const db = require("./db");
const {
  users,
  students,
  books,
  pages,
  tags,
} = require("./seed.json");

// models
const User = require("./User");
const Student = require("./Student");
const Book = require("./Book");
const Page = require("./Page");
const Tag = require("./Tag");
const BookTag = require("./BookTag");

// relations
User.hasMany(Student);
Student.belongsTo(User);

Student.hasMany(Book);
Book.belongsTo(Student);

Student.hasMany(Page);
Page.belongsTo(Student);

Page.belongsTo(Book);
Book.hasMany(Page);

Tag.belongsToMany(Book, { through: BookTag });
Book.belongsToMany(Tag, { through: BookTag });

// seeding
// const createBookTag = async (bookTag) => {
//   const book = await Book.findByPk(bookTag.bookId);
//   const tag = await Tag.findByPk(bookTag.tagId);
//   return await book.addTag(tag);
// };

const syncAndSeed = async (closeConn=false) => {
  try {
    await db.sync({ force: true });
    console.log("Connected to database!");

const user = await User.bulkCreate(users, { individualHooks: true });
const student = await Student.bulkCreate(students, {individualHooks: true});
const book = await Book.bulkCreate(books);
const page = await Page.bulkCreate(pages);
const tag = await Tag.bulkCreate(tags);

    console.log(
      `Seeding Successful!`,
      //"User Special Methods: ", Object.keys(User.prototype),
      //"Student Special Methods: ", Object.keys(Student.prototype),
      // "Book Special Methods: ", Object.keys(Book.prototype),
      // "Page Special Methods: ", Object.keys(Page.prototype),
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
  BookTag,
};
