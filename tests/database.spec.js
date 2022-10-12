const { expect } = require("chai");
const { db, User, Student, Book, Page, Tag } = require("../server/db");
const { users, students, books, pages, tags, bookTags } = require("./testSeed.json");
const { getOrderedLinkedList } = require("./utils");

async function testSync() {
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

describe("Database functionality", () => {

    xdescribe("Basic validation", () => {
        it("Can add items to database", async () => {
            await db.sync({ force: true });

            const jimmy = await User.create({
                firstName: "Jimmy",
                lastName: "Smith",
                username: "jimsmith20",
                password: "password",
                email: "jimsmith@gmail.com",
            });
            expect(jimmy.firstName).to.equal("Jimmy");
            expect(jimmy.lastName).to.equal("Smith");
        });
    });

    xdescribe("'Pages' model is a linked list", async () => {
        beforeEach(async () => {
            await testSync();
        });

        it(`Every page has a unique previousPage and nextPage`, async () => {
            const pages = await Page.findAll();
            for (let i = 0; i < pages.length; i++) {
                for (let j = i + 1; j < pages.length - 1; j++) {
                    // ensure we ignore 'null' for comparisons
                    if (pages[i].previousPage && pages[i].nextPage) {
                        expect(pages[i].previousPage).to.not.equal(pages[j].previousPage);
                        expect(pages[i].nextPage).to.not.equal(pages[j].nextPage);
                    }
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
            const pages = await Page.findAll({ where: { bookId: 3 }});

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
    describe("'Pages' remains valid after reordering", async () => {
        let logOnce = true;

        before(async () => {
            await testSync();
            // book 3 has 18 pages => here we are reordering 1
            // original pageIds: [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
            const pages = await Page.findAll({ where: { bookId: 3 }});
            const selected = pages.filter(page => page.id === 23 || page.id == 36).sort();
            await selected[1].insertAfter(selected[0]);

            // book 2 has 6 pages => here we are adding 1 to the start
            // original pageIds: [13,14,15,16,17,18]
            // const pages2 = await Page.findAll({ where: { bookId: 2 }});
            // if (logOnce) {
            //     console.log(getOrderedLinkedList(pages2));
            //     logOnce = false;
            // }
            // currently, pages 13 and 14 have same nextPage (15)
            // await pages2[4].makeFirst();
        });

        // log the Ids of pages with matching prev/next pages if any test fails
        afterEach(async function() {
            if (this.currentTest.state === "failed") {
                const pages = await Page.findAll();
                for (let i = 0; i < pages.length; i++) {
                    for (let j = i + 1; j < pages.length - 1; j++) {
                        // ensure we ignore 'null' for comparisons
                        if (pages[i].previousPage && pages[i].nextPage) {
                            if (pages[i].previousPage === pages[j].previousPage || pages[i].nextPage === pages[j].nextPage) {
                                console.log(pages[i].id, pages[j].id);
                            }
                        }
                    }
                }
            }
        });

        it(`Every page has a unique previousPage and nextPage`, async () => {
            const pages = await Page.findAll();
            for (let i = 0; i < pages.length; i++) {
                for (let j = i + 1; j < pages.length - 1; j++) {
                    // ensure we ignore 'null' for comparisons
                    if (pages[i].previousPage && pages[i].nextPage) {
                        expect(pages[i].previousPage).to.not.equal(pages[j].previousPage);
                        expect(pages[i].nextPage).to.not.equal(pages[j].nextPage);
                    }
                }
            }
        });

        it(`No page has 'null' for both previousPage and nextPage`, async () => {
            const pages = await Page.findAll();
            pages.forEach(page => {
                // if (page.id === 35) {
                //     console.log(`prev: ${page.previousPage} | next: ${page.nextPage}`);
                // }
                expect(page.previousPage).to.not.equal(page.nextPage);
            });
        });

        it(`The list of pages can be navigated from start to end`, async () => {
            const pages = await Page.findAll({ where: { bookId: 3 }});

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

        // it(`Pages can be added to start`, async () => {
        //     const pages = await Page.findAll({ where: { bookId: 2 }});
        //     // console.log(getOrderedLinkedList(pages));
        // })
    });
});
