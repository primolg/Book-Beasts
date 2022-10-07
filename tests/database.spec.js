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
// unique emails, fields cannot be null, etc

describe("Database functionality", () => {

    beforeEach(async () => {
        await db.sync({ force: true });
    });

    describe("Basic validation", () => {
        it("Can add items to database", async () => {
            // for now, just a simple check to ensure items can be created (relearning how to write mocha/chai)
            const jimmy = await User.create(users[0]);
            expect(jimmy.firstName).to.equal("Jimmy");
            expect(jimmy.password).to.equal("password");
        });
    });

    describe("'Pages' model is a linked list", async () => {
        beforeEach(async () => {
            await db.sync({ force: true });
            await Promise.all(books.map(book => Book.create(book)));
            await Promise.all(pages.map(page => Page.create(page)));
        });

        it(`Every page has a unique previousPage and nextPage`, async () => {
            const pages = await Page.findAll();
            for (let i = 0; i < pages.length; i++) {
                for (let j = i + 1; j < pages.length - 1; j++) {
                    expect(pages[i].previousPage).to.not.equal(pages[j].previousPage);
                    expect(pages[i].nextPage).to.not.equal(pages[j].nextPage);
                }
            }
        });

        it(`No page has 'null' for both previousPage and nextPage`, async () => {
            const pages = await Page.findAll();
            pages.forEach(page => {
                expect(page.previousPage).to.not.equal(page.nextPage);
            });
        });

        it(`The list of pages can be navigated from start to end`, async () => {
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
    });

    // This is nearly identical to the first check of the pages
    // They should be consolidated eventually, but I had many errors when trying to do so initially
    // Can test other methods here when added (such as deleting pages, adding page to start, etc)
    describe("'Pages' entries are valid after reordering pages", async () => {
        beforeEach(async () => {
            await db.sync({ force: true });
            await Promise.all(books.map(book => Book.create(book)));
            await Promise.all(pages.map(page => Page.create(page)));

            const pageToMove = await Page.findByPk(2);
            await pageToMove.insertAfter(3);
        });

        it(`Every page has a unique previousPage and nextPage`, async () => {
            const pages = await Page.findAll();
            for (let i = 0; i < pages.length; i++) {
                for (let j = i + 1; j < pages.length - 1; j++) {
                    expect(pages[i].previousPage).to.not.equal(pages[j].previousPage);
                    expect(pages[i].nextPage).to.not.equal(pages[j].nextPage);
                }
            }
        });

        it(`No page has 'null' for both previousPage and nextPage`, async () => {
            const pages = await Page.findAll();
            pages.forEach(page => {
                expect(page.previousPage).to.not.equal(page.nextPage);
            });
        });

        it(`The list of pages can be navigated from start to end`, async () => {
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
    });
});
