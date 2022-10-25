const router = require('express').Router();
const { Student, Book, Page } = require('../db');
const { requireStudentToken } = require("../gatekeeper");
// should consider token verification for most of these actions
// make a separate function to get and attach pages to a book before res.send

// === Create/edit/delete books === //

// gets UNPUBLISHED book w/ pages for editing
router.get('/:bookId', requireStudentToken, async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.bookId);
        if (!book?.id) {
            res.send({
                error: true,
                errorType: "undefined"
            });
        } else if (book.studentId !== req.user.id) {
            res.send({
                error: true,
                errorType: "noAccess"
            })
        } else {
            const pages = await book.getOrderedPages();
            book.dataValues.pages = pages;
            res.send(book);
        }
    } catch (error) {
        next(error);
    }
});

// create new book
router.post('/', async (req, res, next) => {
    try {
        const student = await Student.findByPk(req.body.studentId);
        const newBook = await student.createBook({
            title: req.body.title,
            genre: req.body.genre,
        });
        const pages = await newBook.getOrderedPages();
        newBook.dataValues.pages = pages;
        res.send(newBook);
    } catch (error) {
        next(error);
    }
});

// update book (attributes such as genre, title)
router.put('/:bookId', async (req, res, next) => {
    try {
        await Book.update(
            { ...req.body },
            { where: { id: req.params.bookId }}
        );
        const updatedBook = await Book.findByPk(req.params.bookId);
        res.send(updatedBook);
    } catch (error) {
        next(error);
    }
});

// delete book
router.delete('/:bookId', async(req, res, next) => {
    try {
        const deletedBook = await Book.findByPk(req.params.bookId);
        await deletedBook.destroy();
        res.send(deletedBook);
    } catch(error) {
        next(error);
    }
});

// === Create/edit/delete pages === //

// create new page => returns book w/ pages
router.post('/:bookId/pages', async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.bookId);
        const newPage = await book.createNewPage(req.body.templateId);
        await book.reload();
        const pages = await book.getOrderedPages();
        book.dataValues.pages = pages;
        res.send(book);
    } catch (error) {
        next(error);
    }
});

// edit page => returns updated pages array
router.put('/:bookId/pages/:pageId', async (req, res, next) => {
    try {
        await Page.update(
            { ...req.body },
            { where: { id: req.params.pageId }}
        );
        const book = await Book.findByPk(req.params.bookId);
        // might not be necessary if separate route is made for reordering...?
        const pages = await book.getOrderedPages();
        res.send(pages);
    } catch (error) {
        next(error);
    }
});

// delete page => returns updated book w/ pages
router.delete('/:bookId/pages/:pageId', async (req, res, next) => {
    try {
        let book = await Book.findByPk(req.params.bookId);
        book = await book.deletePage(req.params.pageId);
        const pages = await book.getOrderedPages();
        book.dataValues.pages = pages;
        res.send(book);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
