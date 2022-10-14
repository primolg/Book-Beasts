const { expect } = require("chai");
const { Op } = require("sequelize");
const { db, User, Student, Book, Page, Tag } = require("../server/db");
const { users, students, books, pages, tags, bookTags } = require("./testSeed.json");
const { sleep } = require("./utils");

// types: sync, users, custom, tags
async function testSyncAndSeed(type) {
    const createBookTag = async (bookTag) => {
        const book = await Book.findByPk(bookTag.bookId);
        const tag = await Tag.findByPk(bookTag.tagId);
        return await book.addTag(tag);
    };
    try {
        await db.sync({ force: true });
        if (type === "sync") return;
        
        await Promise.all(users.map((user) => User.create(user)));
        await Promise.all(students.map((student) => Student.create(student)));

        if (type === "users") return;
        if (type === "custom") {
            await Book.create({
                title: "The Big Bad Data Structure",
                genre: "horror",
                studentId: 16,
            });
            await Book.create({
                title: "Kachow: Part 2",
                genre: "racecar",
                studentId: 2,
            });
            await Book.create({
                title: "I Have The Best Capstone Group",
                genre: "family",
                studentId: 26,
            });
            return;
        } else {
            await Book.bulkCreate(books);
            await Page.bulkCreate(pages);
        }
        if (type === "tags") {
            await Promise.all(tags.map((tag) => Tag.create(tag)));
            await Promise.all(bookTags.map((bookTag) => createBookTag(bookTag)));
        }
    } catch (error) {
        console.error("Seeding database failed:", error);
    }
};

describe("Books model", () => {
    before(async () => {
        await testSyncAndSeed("custom");
    });

    it("Can create new books", async () => {
        const bookTitle = "I Love Mocha Tests";
        const studentId = 3;

        const newBook = await Book.create({
            title: bookTitle,
            genre: "poetry",
            studentId: studentId,
        });
        expect(newBook.title).to.equal(bookTitle);
        expect(newBook.studentId).to.equal(studentId);
        expect(newBook.totalPages).to.equal(2);
    });

    it("Can add pages to books", async () => {
        const book = await Book.findOne({
            where: {
                title: "I Love Mocha Tests",
            },
        });
        const pages = await book.getPages();
        const originalFirstPage =  pages.find(p => !p.previousPage);
        const originalLastPage = pages.find(p => !p.nextPage);
        const newPage = await book.createNewPage();
        const newPage2 = await book.createNewPage();

        await newPage.reload();
        await originalFirstPage.reload();
        await originalLastPage.reload();
        await book.reload();
        
        // expectations for each page
        expect(originalFirstPage.previousPage).to.equal(null);
        expect(originalFirstPage.nextPage).to.equal(originalLastPage.id);

        expect(originalLastPage.previousPage).to.equal(originalFirstPage.id);
        expect(originalLastPage.nextPage).to.equal(newPage.id);

        expect(newPage.previousPage).to.equal(originalLastPage.id);
        expect(newPage.nextPage).to.equal(newPage2.id);

        expect(newPage2.previousPage).to.equal(newPage.id);
        expect(newPage2.nextPage).to.equal(null);

        // expectations for book
        expect(book.totalPages).to.equal(4);
    });

    // should NOT allow totalPages to go below 2 (for now)
    it("Can remove pages from books", async () => {
        const book = await Book.findOne({
            where: {
                title: "I Love Mocha Tests",
            },
        });
        let pages = (await book.getPages()).sort((a,b) => a.id - b.id);
        await book.deletePage(pages[2]);

        await book.reload();
        pages = (await book.getPages()).sort((a,b) => a.id - b.id);

        expect(pages[2].previousPage).to.equal(pages[1].id);
        expect(pages[1].nextPage).to.equal(pages[2].id);
        expect(book.totalPages).to.equal(3);
    });

    it("Deleting books deletes all related pages", async () => {
        const book = await Book.findOne({
            where: {
                title: "The Big Bad Data Structure",
            },
        });
        await book.destroy();
        const pages = await Page.findAll({
            where:  {
                [Op.or]: [
                    { bookId: book.id },
                    { bookId: null },
                ],
            }
        });
        expect(pages.length).to.equal(0);
    });

    xit("Books cannot have less than 2 pages", async () => {
        // Maybe this should be 1 page instead of 2... TBD
    });

    // should use this method in other pages tests
    it("'getOrderedPages' returns the correct array", async () => {
        const book = await Book.findOne({
            where: {
                title: "I Love Mocha Tests",
            },
        });
        await book.createNewPage();
        await book.createNewPage();
        book.reload();

        const pages = await book.getOrderedPages();
        const expected = pages.map(p => p.id).sort((a,b)=>a-b);
        for (let i = 0; i < pages.length; i++) {
            expect(pages[i].id).to.equal(expected[i],
                `\nPages: ${pages.map(p=>p.id)}\nExpected: ${expected}`);
        }
    });
});

describe("Pages model functions as a linked list data structure", () => {
    const runs = [
        { iter: 1, msg: "Data seeds correctly", note: "hard-coded ids", books: [4]},
        { iter: 2, msg: "Intact after various 'insertAfter' usages", note: "hard-coded ids", books: [3,5]},
        { iter: 3, msg: "Intact after using all 'Page' methods", note: "hard-coded ids"},
        // { iter: 4, msg: "All methods work together seamlessly when starting from empty db" },
    ];

    runs.forEach(run =>
        // disabled testing of seed data as it is no longer necessary
        (run.iter===1 ? xdescribe : describe)(run.msg + (run.note && ` (${run.note})`), async () => {
            before(async () => {
                if (run.iter === 1) {
                    await testSyncAndSeed();
                } else if (run.iter === 2) {
                    await testSyncAndSeed();

                    // book3: 2 internal reorders
                    let pages = await Page.findAll({ where: { bookId: 3 }});
                    let selected = pages.filter(page => page.id==23 || page.id==28).sort();
                    await selected[1].insertAfter(selected[0]);

                    pages = await Page.findAll({ where: { bookId: 3 }});
                    selected = pages.filter(page => page.id==23 || page.id==35).sort((a,b) => a.id - b.id);
                    await selected[0].insertAfter(selected[1]);

                    // book5: first/last pages moved to middle
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

                } else if (run.iter === 3){
                    await testSyncAndSeed();

                    // book1: move pages from middle to start and end
                    // book1 before: [1,2,3,4,5,6,7,8,9,10,11,12]
                    let pages = await Page.findAll({ where: { bookId: 1 }});
                    let selected = pages
                        .filter(page => page.id===5 || page.id===10)
                        .sort((a,b) => a.id - b.id);
                    await selected[0].insertEnd();
                    await selected[1].insertStart();
                    // book1 after: [10,1,2,3,4,6,7,8,9,11,12,5]

                    // book2: move firstPage to end
                    // book2 before: [13,14,15,16,17,18]
                    pages = await Page.findAll({ where: { bookId: 2 }});
                    selected = pages.find(page => !page.previousPage);
                    await selected.insertEnd();
                    // book2 after: [14,15,16,17,18,13]
                    
                    // book4: move lastPage to start
                    // book4 [37,38,39,40,41,42,43,44,45,46,47,48,49]
                    pages = await Page.findAll({ where: { bookId: 4 }})
                    selected = pages.find(page => !page.nextPage);
                    await selected.insertStart();

                    // book6: swap first 2 pages (with eachother) and last 2 pages (with eachother)
                    // book6 before: [57,58,59 ... 70,71,72]
                    pages = await Page.findAll({ where: { bookId: 6 }})
                    selected = pages.filter(page =>
                        !page.previousPage || !page.nextPage || page.id===58 || page.id===71
                    ).sort((a,b) => a.id - b.id);
                    await selected[0].insertAfter(selected[1]);
                    await selected[2].insertEnd();
                    // book6 after: [58,57,59 ... 70,72,71]
                } else if (run.iter === 4) {
                    // todo => tests for "custom" seed (advanced reordering without hard-coded ids)
                }
            });

            it(`Every page has a unique previousPage and nextPage`, async () => {
                const pages = await Page.findAll();
                for (let i = 0; i < pages.length; i++) {
                    for (let j = i + 1; j < pages.length - 1; j++) {
                        // ensure we ignore 'null' for comparisons
                        if (pages[i].previousPage && pages[i].nextPage) {
                            expect(pages[i].previousPage).to.not.equal(pages[j].previousPage,
                                `prevPage error in book ${pages[i].bookId}\n         ids: [${pages[i].id}, ${pages[j].id}]\n         i: ${pages[i].previousPage} | j: ${pages[j].previousPage}`);
                            expect(pages[i].nextPage).to.not.equal(pages[j].nextPage,
                                `nextPage error in book ${pages[i].bookId}\n         ids: [${pages[i].id}, ${pages[j].id}]\n         i: ${pages[i].nextPage} | j: ${pages[j].nextPage}`);
                        }
                    }
                }
            });

            it(`No page has the same value for both previousPage and nextPage`, async () => {
                const pages = await Page.findAll();
                pages.forEach(page => {
                    if (page.previousPage || page.nextPage) {
                        expect(page.previousPage).to.not.equal(page.nextPage);
                    } else {
                        // todo: handle books with 1 page (null for both previous/next)
                    }
                });
            });

            it(`The list of pages can be navigated from start to end`, async () => {
                // run 1/2: test 3/5 | run 3/4: test all in db
                const testBook = async (firstPage) => {
                    const totalPages = (await firstPage.getBook()).totalPages;
                    let currentPage = firstPage;
                    // counts the number of nodes traversed through to ensure it reaches every page
                    let traversalCounter = 0;

                    for (let i = 0; i < totalPages; i++) {
                        traversalCounter++;
                        if (currentPage.nextPage === null) break;
                        currentPage = await Page.findByPk(currentPage.nextPage);
                    };

                    expect(traversalCounter).to.equal(
                        totalPages,
                        `Linked list count different from number of pages in book ${currentPage.bookId}`
                    );
                };
                let firstPages = await Page.findAll({ where: { previousPage: null }});
                // this allows us to specify which books to test here in 'runs' array
                firstPages = (run.books && firstPages.filter(page => 
                        run.books.includes(page.bookId))
                    ) || firstPages;
                
                for (let i = 0; i < firstPages.length; i++) {
                    await testBook(firstPages[i]);
                };
            });

            // it(`No page in a book points to a page from another book`)

            // it(`'getOrderedPages' still returns correct array after page manipulation (2/3/4)'`)

            if (run.iter < 4) return;

            it(`Checks for new books on final test iteration`)
        })
    );
});
