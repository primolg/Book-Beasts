const router = require('express').Router();
const { Student, Book } = require('../db');


//GET all students
router.get('/', async(req, res, next) => {
    try{
        const studentList = await Student.findAll();
        res.send(studentList);
    }catch(error){
        next(error);
    }
});

//GET single student & their books
router.get('/:id', async(req, res, next) => {
    try{
        const student = await Student.findByPk(req.params.id);
        const books = await Book.findAll({
            where: {
                studentId: req.params.id
            }
        });
        res.send({student, books})
    }catch(error){
        next(error);
    }
});

module.exports = router;