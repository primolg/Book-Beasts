const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { Student, Book, User, Page } = require('../db');
const { requireUserToken, isAdmin } = require('../gatekeeper');


//add requireToken argument VV

router.get('/:id', requireUserToken, async(req, res, next) => {
    try{
        const instructor = await User.findByPk(req.params.id, {
            include: {
                model: Student,
            }
        });
        res.send(instructor)
    }catch(error){
        next(error);
    }
});


//PUT edit Instructor 

router.put('/:id',  async(req, res, next) => {
    try{
    const updatedInstructor = await User.findByPk(req.params.id);
    await updatedInstructor.update(req.body);
    res.send(updatedInstructor);
    }catch(error){
        next(error);
    }
});

//DELETE delete instructor account

router.delete('/:id',  async(req, res, next) => {
    try{
    const deletedInstructor = await User.findByPk(req.params.id);
    await deletedInstructor.destroy();
    res.send(deletedInstructor);
    }catch(error){
        next(error);
    }
});

//GET student and books

router.get('/:id/students', async(req, res, next) => {
    try{
    const allStudents = await Student.findAll({
        where: {
            userId: req.params.id
        },
        include: {
            model: Book,
        },
    });
    res.send(allStudents);
    }catch(error){
        next(error);
    }
});

router.get('/:id/students/:studentId', async(req, res, next) => {
    try{
        const singleStudent = await Student.findByPk(req.params.studentId,{
            where: {
                userId: req.params.id,
            },
            include: {
                model: Book,
            },
        });
        res.send(singleStudent);
    }catch(error){
        next(error);
    }
})

//Instructor Students Routes

router.post('/:id/students', async(req, res, next) => {
    try{
        const addStudent = await Student.create(req.body);
        res.send(addStudent);
    }catch(error) {
        next(error);
    }
});

router.put('/:id/students/:studentId',  async(req, res, next) => {
    try{
    const editStudent = await Student.findByPk(req.params.studentId);
    res.send(await editStudent.update(req.body));
    }catch(error){
        next(error);
    }
});

router.delete('/:id/students/:studentId',  async(req, res, next) => {
    try{
    const deleteStudent = await Student.findByPk(req.params.studentId);
    await deleteStudent.destroy();
    }catch(error){
        next(error);
    }
});

//get books routes

router.get('/:id/students/:studentId/books', async(req, res, next) => {
    try{
    const studentBooks = await Book.findAll({
        where: {
            studentId: req.params.studentId
        },
        include: {
            model: Student
        },
    });
    res.send(studentBooks);
    }catch(error){
        next(error);
    }
});


router.get('/:id/students/:studentId/books/:bookId', async(req, res, next) => {
    try{
    const studentOneBook = await Book.findByPk(req.params.bookId, {
        include: {
            model: Student,
            model: Page,
        },
    });
    res.send(studentOneBook);
    }catch(error){
        next(error);
    }
});




module.exports = router;