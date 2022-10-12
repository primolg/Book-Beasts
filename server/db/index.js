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
      "Page Special Methods: ", Object.keys(Page.prototype),
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














// //const data = require("./seed");
// const db = require("./db");
// // models
// const User = require("./User");
// const Student = require("./Student");
// const Book = require("./Book");
// const Page = require("./Page");
// const Tag = require("./Tag");
// const PageItem = require("./PageItem");

// User.hasMany(Student);
// Student.belongsTo(User);

// Student.hasMany(Book);
// Book.belongsTo(Student);

// Student.hasMany(Page);
// Page.belongsTo(Student);

// Page.belongsTo(Book);
// Book.hasMany(Page);

// Tag.belongsToMany(Book, { through: 'bookTags' });
// Book.belongsToMany(Tag, { through: 'bookTags' });

// const syncAndSeed = async () => {
//     try {
//         await db.sync({ force: true });

//         const users = await User.bulkCreate([
//             {
//               firstName: 'Sarah',
//               lastName: 'Lozier',
//               isAdmin: false,
//               email: 'sarah@gmail.com',
//               username: 'sarLoz',
//               password: 'hello1',
//             },
//             {
//               firstName: 'Doria',
//               lastName: 'Morin',
//               isAdmin: false,
//               email: 'doria@gmail.com',
//               username: 'dorMor',
//               password: 'hello2,'
//             },
//             {
//               firstName: 'Karla',
//               lastName: 'Green',
//               isAdmin: false,
//               email: 'karla@gmail.com',
//               username: 'karGre',
//               password: 'hello3',
//             },
//           ]);
                
//             const students = await Student.bulkCreate([
//               {
//                 firstName: 'Emilia',
//                 lastName: 'Morin',
//                 email: 'emilia@gmail.com',
//                 username: 'emiMor',
//                 password: 'kid1',
//                 age: 11,
//                 color: 'aqua',
//                 userId: 2,
//               },
//               {
//                 firstName: 'Victoria',
//                 lastName: 'Green',
//                 email: 'victoria@gmail.com',
//                 username: 'vicGre',
//                 password: 'kid2',
//                 age:10,
//                 color: 'purple',
//                 userId: 3,
//               },
//               {
//                 firstName: 'Lillian',
//                 lastName: 'Green',
//                 email: 'lillian@gmail.com',
//                 username: 'lilGre',
//                 password: 'kid3',
//                 age: 9,
//                 color: 'yellow',
//                 userId: 3,
//               },
//               {
//                 firstName: 'Leo',
//                 lastName: 'Morin',
//                 email: 'leo@gmail.com',
//                 username: 'leoMor',
//                 password:' kid4',
//                 age: 8,
//                 color: 'red',
//                 userId: 2,
//               },
//               {
//                 firstName: 'Robert',
//                 lastName: 'Morin',
//                 email: 'robert@gmail.com',
//                 username: 'robMor',
//                 password: 'kid5',
//                 age: 8,
//                 color: 'green',
//                 userId: 2, 
//               },
//               {
//                 firstName: 'Nolan',
//                 lastName: 'Lozier',
//                 email: 'nolan@gmail.com',
//                 username: 'nolLoz',
//                 password: 'kid6',
//                 age: 7,
//                 color: 'blue',
//                 userId: 1,
//               },
//               {
//                 firstName: 'Evan',
//                 lastName: 'Lozier',
//                 email: 'evan@gmail.com',
//                 username: 'evaLoz',
//                 password: 'kid7',
//                 age: 5,
//                 color: 'orange',
//                 userId: 1, 
//               },
//               {
//                 firstName: 'Liam',
//                 lastName: 'Lozier',
//                 email: 'liam@gmail.com',
//                 username: 'liaLoz',
//                 password: 'kid8',
//                 age: 11,
//                 color: 'purple',
//                 userId: 1,
//               },
//               {
//                 firstName: 'Emily',
//                 lastName: 'Morin',
//                 email: 'emily@gmail.com',
//                 username: 'emyMor',
//                 password: 'kid9',
//                 age: 9,
//                 color: 'pink',
//                 userId: 2, 
//               },
//             ]);
            
//             const books = await Book.bulkCreate([
//               {
//                 title: 'Book One',
//                 isPublished: true,
//                 totalPages: 3,
//                 genre: 'mystery',
//                 studentId: 1,
//               },
//               {
//                 title: 'Book Two',
//                 isPublished: true,
//                 totalPages: 3,
//                 genre: 'fantasy',
//                 studentId: 8,
//               },
//               {
//                 title: 'Book Three',
//                 isPublished: true,
//                 totalPages: 3,
//                 genre: 'mystery',
//                 studentId: 1,
//               },
//               {
//                 title: 'Book Four',
//                 isPublished: true,
//                 totalPages: 3,
//                 genre: 'action',
//                 studentId: 2,
//               },
//               {
//                 title: 'Book Five',
//                 isPublished: false,
//                 totalPages: 3,
//                 genre: 'autobiography',
//                 studentId: 3,
//               },
//               {
//                 title: 'Book Six',
//                 isPublished: true,
//                 totalPages: 3,
//                 genre: 'fantasy',
//                 studentId: 4,
//               },
//               {
//                 title: 'Book Seven',
//                 isPublished: true,
//                 totalPages: 3,
//                 genre: 'poetry',
//                 studentId: 5,
//               },
//               {
//                 title: 'Book Eight',
//                 isPublished: true,
//                 totalPages: 3,
//                 genre: 'biography',
//                 studentId: 6,
//               },
//               {
//                 title: 'Book Nine',
//                 isPublished: true,
//                 totalPages: 3,
//                 genre: 'autobiography',
//                 studentId: 7,
//               },
//               {
//                 title: 'Book Ten',
//                 isPublished: true,
//                 totalPages: 3,
//                 genre:'fantasy',
//                 studentId: 8,
//               },
//               {
//                 title: 'Book Eleven',
//                 isPublished: true,
//                 totalPages: 3,
//                 genre: 'action',
//                 studentId: 9,
//               },
//               {
//                 title: 'Book Twelve',
//                 isPublished: true,
//                 totalPages: 3,
//                 genre: 'poetry',
//                 studentId: 1,
//               },
//               {
//                 title: 'Book Thirteen',
//                 isPublished: true,
//                 totalPages: 3,
//                 genre: 'fantasy',
//                 studentId: 2,
//               },
//               {
//                 title: 'Book Fourteen',
//                 isPublished: true,
//                 totalPages: 3,
//                 genre: 'scifi',
//                 studentId: 3,
//               },
//               {
//                 title: 'Book Fifteen',
//                 isPublished: true,
//                 totalPages: 3,
//                 genre: 'scifi',
//                 studentId: 4,
//               },
//             ]);
            
//             const pages = Page.bulkCreate([
//               {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 1,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 1,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 1,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 2,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 2,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 2,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 3,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 3,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 3,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 4,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 4,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 4,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 5,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 5,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 5,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 6,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 6,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 6,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 7,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 7,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 7,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 8,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 8,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 8,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 9,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 9,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 9,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 1,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 1,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 1,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 1,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 1,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 1,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 8,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 8,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 8,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 2,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 2,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 2,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 3,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 3,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 3,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 4,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 4,
//               },
//                   {
//                 content:"Cupcake ipsum dolor sit amet dragée. Bonbon jelly-o jujubes powder pie jujubes. Pastry gingerbread chupa chups croissant cupcake topping donut. I love sugar plum donut I love cotton candy sesame snaps toffee. Tart croissant sesame snaps muffin candy. Tiramisu gingerbread gummies dragée cake pie apple pie cookie. I love I love sweet roll cake muffin macaroon I love chocolate bar ice cream. Cake tootsie roll ice cream cookie croissant cupcake. Fruitcake pastry sugar plum candy dragée caramels. Jujubes cake shortbread sesame snaps cookie chocolate bar pastry brownie bear claw. Marshmallow cupcake cupcake cotton candy halvah chocolate cake halvah. Cupcake marzipan carrot cake cotton candy tiramisu jelly beans icing I love jelly. Croissant jujubes I love I love cake dessert. Gummi bears sweet jelly cheesecake sesame snaps. I love ice cream tootsie roll cake cake. Macaroon I love muffin cupcake shortbread chocolate cake.",
//                 image: null,
//                 type: "textOnly",
//                 studentId: 4,
//               },
//             ]);

//             console.log(`Seeding Successful!`,
            
//               //"User Special Methods: ", Object.keys(User.prototype),
//              //"Student Special Methods: ", Object.keys(Student.prototype),
//              //"Book Special Methods: ", Object.keys(Book.prototype),
//               //"Page Special Methods: ", Object.keys(Page.prototype),
//             //"PageItem Special Methods: ", Object.keys(PageItem.prototype)
//             );

           

//     } catch (error) {
//         console.error("Seeding database failed:", error)
//     }
    
// };

// module.exports = {
//     db,
//     syncAndSeed,
//     User,
//     Student,
//     Book,
//     Page,
//     PageItem,
//     Tag,
// };
