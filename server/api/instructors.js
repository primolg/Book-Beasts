const router = require('express').Router();
const { Student, Book, User } = require('../db');
//import requireToken, isAdmin from gatekeeper


//GET Instructors (add gatekeeper function to get arguments)
router.get('/', async(req, res, next) => {
    try{
        const instructorList = await User.findAll();
        res.send(instructorList);
    }catch(error){
        next(error);
    }
});

//add requireToken argument VV

router.get('/:id', async(req, res, next) => {
    try{
        const instructor = await User.findByPk(req.params.id, {
            include: {
                model: Student
            }
        });
        res.send(instructor)
    }catch(error){
        next(error);
    }
});

//POST create new Instructor
//{ token: await addInstructor.generateToken(), id: addInstructor.id}

router.post('/', async(req, res, next) => {
    try{
    req.body.isAdmin = false;
    const addInstructor = await User.create(req.body);
    res.send(addInstructor);
    }catch(error){
        next(error);
    }
});

//POST login as Instructor in auth file??


//PUT edit Instructor (requireToken)

router.put('/:id', async(req, res, next) => {
    try{
    const updatedInstructor = await User.findByPk(req.params.id);
    await updatedInstructor.update(req.body);
    res.send(updatedInstructor);
    }catch(error){
        next(error);
    }
});

//DELETE delete instructor account

router.delete('/:id', async(req, res, next) => {
    try{
    const deletedInstructor = await User.findByPk(req.params.id);
    await deletedInstructor.destroy();
    res.send(deletedInstructor);
    }catch(error){
        next(error);
    }
});

//GET student and books

router.get('/students', async(req, res, next) => {
    try{
    const allStudents = await Student.findAll({
        where: {
            userId: req.params.userId
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

//Instructor Students Routes
// add { token: await addStudent.generateToken(), id: addStudent.id, userId: req.params.userId} 

router.post('/students', async(req, res, next) => {
    try{
        const addStudent = await Student.create(req.body);
        res.send(addStudent);
    }catch(error) {
        next(error);
    }
});

router.put('/students/:studentId', async(req, res, next) => {
    try{
    const editStudent = await Student.findByPk(req.params.studentId);
    res.send(await editStudent.update(req.body));
    }catch(error){
        next(error);
    }
});

router.delete('/students/:studentId', async(req, res, next) => {
    try{
    const deleteStudent = await Student.findByPk(req.params.studentId);
    await deleteStudent.destroy();
    }catch(error){
        next(error);
    }
});

//Instructor Child's books routes

router.get('/students/:studentId/books', async(req, res, next) => {
    try{
    const studentBooks = await Book.findAll({
        where: {
            studentId: req.params.studentId
        },
        include:{
            model: Student
        },
    });
    res.send(studentBooks);
    }catch(error){
        next(error);
    }
});

router.get('/students/:studentId/books/:bookId', async(req, res, next) => {
    try{
    const studentOneBook = await Book.findOne({
        where: {
            bookId: req.params.bookId,
            studentId: req.params.studentId
        },
        include: {
            model: Student
        },
    });
    res.send(studentOneBook);
    }catch(error){
        next(error);
    }
});




module.exports = router;