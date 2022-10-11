const { expect } = require("chai");
const { db, User, Student, Book, Page, Tag } = require("../server/db");
const { users, students, books, pages, tags, bookTags } = require("./testSeed.json");
const { login } = require("../src/store/reducers/authSlice");

// creates localStorage copy (mocha runs in node - no window/ls)
const createMockLocalStorage = () => {
    global.window = {
        localStorage: {
            getItem: (key) => {
                if (this[key]) return this[key];
                else return null;
            },
            setItem: (key, value) => {
                this[key] = value;
            },
            removeItem: (key) => {
                delete this[key];
            },
        },
    }
}
// custom sync+seed fn for testing
const testSync = async () => {
    const createBookTag = async (bookTag) => {
        const book = await Book.findByPk(bookTag.bookId);
        const tag = await Tag.findByPk(bookTag.tagId);
        return await book.addTag(tag);
    };
    try {
        await db.sync({ force: true });
        await Promise.all(users.map((user) => User.create(user)));
        await Promise.all(students.map((student) => Student.create(student)));
        await Promise.all(books.map((book) => Book.create(book)));
        await Promise.all(pages.map((page) => Page.create(page)));
        await Promise.all(tags.map((tag) => Tag.create(tag)));
        await Promise.all(bookTags.map((bookTag) => createBookTag(bookTag)));
    } catch (error) {
        console.error("Seeding database failed:", error);
    }
};

describe("Authorization and security", () => {

    describe("Basic functionality", () => {
        beforeEach(async () => {
            await db.sync({ force: true });
        })

        it("Can login to an account", async () => {

        });
        it("Can create a new account", async () => {

        });
        it("Remains logged in when refreshing the page", async () => {

        });
    });

    describe("Valid authorization", () => {
        beforeEach(async () => {
            await testSync();
            createMockLocalStorage();
        })

        it("", async () => {

        });
    })
});
