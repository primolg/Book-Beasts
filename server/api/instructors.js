const router = require('express').Router();
const { Student, Book, User } = require('../db');
const { requireUserToken, isAdmin } = require('../gatekeeper');


//GET Instructors (add gatekeeper function to get arguments)
// router.get('/', requireUserToken, isAdmin, async(req, res, next) => {
//     try{
//         const instructorList = await User.findAll();
//         console.log('INSTRUCTOR LIST API', instructorList);
//         res.send(instructorList);
//     }catch(error){
//         next(error);
//     }
// });

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
        console.log('API GET STUDENTS', req.body)
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
        const singleStudent = await Student.findByPk(req.params.studentId, {
            where: {
                userId: req.params.id
            },
            include: {
                model: Book,
            }
        });
        res.send(singleStudent);
    }catch(error){
        next(error);
    }
})

//Instructor Students Routes
// add { token: await addStudent.generateToken(), id: addStudent.id, userId: req.params.userId} 

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



router.get('/:id/students/:studentId/books/:bookId', async(req, res, next) => {
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