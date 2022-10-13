const { expect } = require("chai");
const { db, User, Student, Book, Page, Tag } = require("../server/db");
const { users, students, books, pages, tags, bookTags } = require("./testSeed.json");
const { logLinkedList, sleep } = require("./utils");

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

describe("Pages model functions as a linked list data structure", () => {
    const runs = [
        // { iter: 1, msg: "before calling any methods" },
        { iter: 2, msg: "after basic reordering" },
        // { iter: 3, msg: "after complex reordering" },
    ]

    runs.forEach(run => 
        describe(`Intact ${run.msg}`, async () => {
            before(async () => {
                if (run.iter === 1) {
                    await testSync();
                } else if (run.iter === 2) {
                    // book 3: 2 internal reorders
                    // book 5: first/last pages moved to middle
                    await testSync();

                    // book3 before: [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
                    let pages = await Page.findAll({ where: { bookId: 3 }});
                    let selected = pages.filter(page => page.id==23 || page.id==28).sort();
                    await selected[1].insertAfter(selected[0]);

                    pages = await Page.findAll({ where: { bookId: 3 }});
                    selected = pages.filter(page => page.id==23 || page.id==35).sort((a,b) => a.id - b.id);
                    await selected[0].insertAfter(selected[1]);
                    // book3 after: [19,20,21,22,28,24,25,26,27,29,30,31,32,33,34,35,23,36]

                    // [50,51,52,53,54,55,56]
                    pages = await Page.findAll({ where: { bookId: 5 }});
                    logLinkedList(pages, 5, "before");
                    selected = pages.filter(
                        page => page.id==52 || page.id==56
                        ).sort((a,b) => a.id - b.id);
                    await selected[1].insertAfter(selected[0]);

                    // move 50 after 53
                    pages = await Page.findAll({ where: { bookId: 5 }});
                    selected = pages.filter(
                        page => page.id==50 || page.id==53
                        ).sort((a,b) => a.id - b.id);
                    await selected[0].insertAfter(selected[1]);

                    pages = await Page.findAll({ where: { bookId: 5 }});
                    logLinkedList(pages, 5, "after");
                    // [51,52,56,53,50,54,55]

                } else {
                    // insertFirst, insertLast
                    // await testSync();
                    // book 1: 12 pages => move a page from middle to the start and the end
                    // book 4: 13 pages => move the first page to the middle, then around, then to end
                    // book 6: 16 pages => move pages from middle to ends, then again

                    // book 2 has 6 pages => here we are adding 1 to the start
                    // original pageIds: [13,14,15,16,17,18]
                    // const pages2 = await Page.findAll({ where: { bookId: 2 }});
                    // if (logOnce) {
                    //     console.log(getOrderedLinkedList(pages2));
                    //     logOnce = false;
                    // }
                    // currently, pages 13 and 14 have same nextPage (15)
                    // await pages2[4].makeFirst();
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
        })
    );
});
