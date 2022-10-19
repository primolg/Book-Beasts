const router = require('express').Router();
const { Student, Book, Page } = require('../db');

// for viewing published books //
// post/put/delete books have been moved to ./editor.js //

//GET Books
router.get('/', async(req, res, next) => {
    try {
        const bookList = await Book.findAll({
            include: {
                model: Student
            }
        });
        res.send(bookList)
    } catch (e) {
        next(e);
    }
});

//GET Single Book
router.get('/:id', async(req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.id, {
            include: {
                model: Student,
                model: Page,
            }
        });
        res.send(book);
    } catch (e) {
        next(e);
    }
})

module.exports = router;
