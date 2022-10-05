const { expect } = require("chai");
const {
    syncAndSeed,
    db,
    User,
    Child,
    Book,
    Page,
    Tag,
} = require("../server/db");
const {
    users,
    children,
    books,
    pages,
    tags
} = require("./testData");

// simple tests to write:
// PAGES linked list method (this is top priority - the others do not matter as much)
// database validation (number of characters, alphanumeric, etc)
// unique emails, fields cannot be null

describe("Database functionality", () => {

    beforeEach(async () => {
        await db.sync({ force: true });
    });

    describe("Basic validation", () => {
        it("Can add items to database", async () => {
            // for now, just a simple check to ensure items can be created (relearning how to write mocha/chai)
            const jimmy = await User.create(users[0])
            expect(jimmy.firstName).to.equal(
                "Jimmy",
                "Unable to create a user"
            );
            expect(jimmy.password).to.equal(
                "password",
                "Unable to create a user"
            )
        });
    });

    describe("'Pages' model functions as a linked list", () => {
        beforeEach(async () => {
            await db.sync({ force: true });
            await Promise.all(books.map(book => Book.create(book)));
            await Promise.all(pages.map(page => Page.create(page)));
        });

        it("The list of pages can be navigated from start to end", async () => {
            const pages = await Page.findAll({ where: { bookId: 1 }});
            // counts the number of nodes traversed through to ensure it reaches every page
            let currentPage = pages.find(page => page.previousPage === null);
            let traversalCounter = 0;
            for (let i = 0; i < pages.length; i++) {
                traversalCounter++;
                if (currentPage.nextPage === null) break;
                currentPage = await Page.findByPk(currentPage.nextPage);
            }
            expect(traversalCounter).to.equal(
                pages.length,
                "Number of pages in linked list different from number of pages in book"
            );
        });

        it("Every page has a unique previousPage and nextPage", async () => {
            const pages = await Page.findAll();
            for (let i = 0; i < pages.length; i++) {
                for (let j = i + 1; j < pages.length - 1; j++) {
                    expect(pages[i].previousPage).to.not.equal(pages[j].previousPage);
                    expect(pages[i].nextPage).to.not.equal(pages[j].nextPage);
                }
            }
        });

        it("No page has 'null' for both previousPage and nextPage", async () => {
            const pages = await Page.findAll();
            pages.forEach(page => {
                expect(page.previousPage).to.not.equal(page.nextPage);
            })
        });

        // it("Inserting a page between other pages updates all pages properly", async () => {

        // });

        // it("Deleting a page creates a link between its previousPage and nextPage", async () => {

        // });
    });
})