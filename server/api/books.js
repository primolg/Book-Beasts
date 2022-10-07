const router = require('express').Router();
const { Student, Book, User } = require('../db');

//GET Books
router.get('/', async(req, res, next) => {
    try {
        const bookList = await Book.findAll();
        res.send(bookList);
    } catch (e) {
        next(e);
    }
});

//GET Single Book
router.get('/:id', async(req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.id, {
            include: {
                model: Student
            }
        });
        res.send(book);
    } catch (e) {
        next(e);
    }
})

//POST create new Book
router.post('/', async (req, res, next) => {
    try {

    } catch (e) {
        next(e);
    }
});

//PUT edit Book
router.put('/:id', async (req, res, next) => {
    try {
        const updatedBook = await Book.findByPk(req.params.id);
        await updatedBook.update(req.body);
        res.send(updatedBook);
    } catch (e) {
        next(e);
    }
});

//DELETE book
router.delete('/:id', async(req, res, next) => {
    try {
        const deletedBook = await Book.findByPk(req.params.id);
        await deletedBook.destroy();
        res.send (deletedBook);
    } catch(e) {

    }
})