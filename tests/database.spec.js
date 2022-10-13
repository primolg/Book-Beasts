const { expect } = require("chai");
const { db, User, Student, Book, Page, Tag } = require("../server/db");
const { users, students, books, pages, tags, bookTags } = require("./testSeed.json");
const { logLinkedList, sleep } = require("./utils");

async function testSync(usersOnly=false) {
    const createBookTag = async (bookTag) => {
        const book = await Book.findByPk(bookTag.bookId);
        const tag = await Tag.findByPk(bookTag.tagId);
        return await book.addTag(tag);
    };
    try {
        await db.sync({ force: true });
        
        await Promise.all(users.map((user) => User.create(user)));
        await Promise.all(students.map((student) => Student.create(student)));
        if (usersOnly) return;

        await Book.bulkCreate(books);
        await Page.bulkCreate(pages);
        await Promise.all(tags.map((tag) => Tag.create(tag)));
        await Promise.all(bookTags.map((bookTag) => createBookTag(bookTag)));
    } catch (error) {
        console.error("Seeding database failed:", error);
    }
};

describe("Books model", () => {
    before(async () => {
        await testSync(true);
    });

    it("Can create new books", async () => {
        // manual id not required in prod (seed data doesn't have book ids)
        const bookId = await Book.max("id") + 1;
        const bookTitle = "I Love Mocha Tests";
        const studentId = 3;

        const newBook = await Book.create({
            id: bookId,
            title: bookTitle,
            genre: "horror",
            studentId: studentId,
        });
        expect(newBook.title).to.equal(bookTitle);
        expect(newBook.studentId).to.equal(studentId);
        expect(newBook.totalPages).to.equal(2);
    });

    it("Can add pages to books", async () => {
        const book = await Book.findByPk(1);
        const pages = await book.getPages();
        const originalFirstId =  pages.find(p => !p.previousPage).id;
        const originalLastId = pages.find(p => !p.nextPage).id;

        let newPage = await book.createNewPage();
        const newPage2 = await book.createNewPage();
        newPage = await Page.findByPk(newPage.id);

        const originalFirstPage = await Page.findByPk(originalFirstId);
        const originalLastPage = await Page.findByPk(originalLastId);
        
        // expectations for each page
        expect(originalFirstPage.previousPage).to.equal(null);
        expect(originalFirstPage.nextPage).to.equal(originalLastId);

        expect(originalLastPage.previousPage).to.equal(originalFirstId);
        expect(originalLastPage.nextPage).to.equal(newPage.id);

        expect(newPage.previousPage).to.equal(originalLastId);
        expect(newPage.nextPage).to.equal(newPage2.id);

        expect(newPage2.previousPage).to.equal(newPage.id);
        expect(newPage2.nextPage).to.equal(null);
    });

    xit("Can remove pages from books", async () => {

    });

    xit("'getOrderedPages' returns the correct array", async () => {
        const book = await Book.findByPk(1);
        // await book.createNewPage();
        // await book.createNewPage();


    });
});

xdescribe("Pages model functions as a linked list data structure", () => {
    const runs = [
        // { iter: 1, msg: "before calling any methods" },
        // { iter: 2, msg: "after basic reordering" },
        // { iter: 3, msg: "after complex reordering" },
        // { iter: 4, msg: "after adding/manipulating pages" },
    ];

    runs.forEach(run =>
        describe(`Intact ${run.msg}`, async () => {
            before(async () => {
                if (run.iter === 1) {
                    await testSync();
                } else if (run.iter === 2) {
                    // book3: 2 internal reorders
                    // book5: first/last pages moved to middle
                    await testSync();

                    // book3 before: [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
                    let pages = await Page.findAll({ where: { bookId: 3 }});
                    let selected = pages.filter(page => page.id==23 || page.id==28).sort();
                    await selected[1].insertAfter(selected[0]);

                    pages = await Page.findAll({ where: { bookId: 3 }});
                    selected = pages.filter(page => page.id==23 || page.id==35).sort((a,b) => a.id - b.id);
                    await selected[0].insertAfter(selected[1]);
                    // book3 after: [19,20,21,22,28,24,25,26,27,29,30,31,32,33,34,35,23,36]

                    // book5 before: [50,51,52,53,54,55,56]
                    pages = await Page.findAll({ where: { bookId: 5 }});
                    selected = pages.filter(
                        page => page.id==52 || page.id==56
                        ).sort((a,b) => a.id - b.id);
                    await selected[1].insertAfter(selected[0]);

                    pages = await Page.findAll({ where: { bookId: 5 }});
                    selected = pages.filter(
                        page => page.id==50 || page.id==53
                        ).sort((a,b) => a.id - b.id);
                    await selected[0].insertAfter(selected[1]);

                    pages = await Page.findAll({ where: { bookId: 5 }});
                    // book5 after: [51,52,56,53,50,54,55]
                } else {
                    // book1: move pages from middle to start and end
                    // book2: move firstPage to end
                    // book4: move lastPage to start
                    // book6: swap first 2 pages (with eachother) and last 2 pages (with eachother)
                    await testSync();

                    // todo
                }
            });

            it(`Every page has a unique previousPage and nextPage`, async () => {
                const pages = await Page.findAll();
                for (let i = 0; i < pages.length; i++) {
                    for (let j = i + 1; j < pages.length - 1; j++) {
                        // ensure we ignore 'null' for comparisons
                        if (pages[i].previousPage && pages[i].nextPage) {
                            expect(pages[i].previousPage).to.not.equal(pages[j].previousPage,
                                `prevPage error\n         ids: [${pages[i].id}, ${pages[j].id}]\n         i: ${pages[i].previousPage} | j: ${pages[j].previousPage}`);
                            expect(pages[i].nextPage).to.not.equal(pages[j].nextPage,
                                `nextPage error\n         ids: [${pages[i].id}, ${pages[j].id}]\n         i: ${pages[i].nextPage} | j: ${pages[j].nextPage}`);
                        }
                    }
                }
            });

            it(`No page has the same value for both previousPage and nextPage`, async () => {
                const pages = await Page.findAll();
                pages.forEach(page => {
                    expect(page.previousPage).to.not.equal(page.nextPage);
                });
            });

            it(`The list of pages can be navigated from start to end`, async () => {
                // should write a function to test every single book here
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

            // it(`No page in a book points to a page from another book`)
            // it(`~currentTest => check for new book on final test iteration`)
        })
    );
});
