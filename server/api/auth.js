const router = require('express').Router();
const { User, Student } = require('../db');

// === credential verification === //

// verifies token, returns associated user (might need refactor later)
router.get("/", async (req, res) => {
    try {
        let user = await User.findByToken(req.headers.authorization);
        if (user?.id) {
            res.send(user)
        } else {
            user = await Student.findByToken(req.headers.authorization);
            if (user?.id) {
                res.send(user);
            } else {
                throw new Error("Unable to verify token");
            }
        }
    } catch (error) {
        console.error(error);
    }
});

// verifies user credentials, returns user with token attached
router.post("/login", async (req, res) => {
    try {
        let user;
        if (req.body.type === "user") {
            user = await User.authenticate(req.body);
        } else if (req.body.type === "student"){
            user = await Student.authenticate(req.body);
        } else {
            throw new Error("Unable to verify account type");
        }
        res.send(user);
    } catch (error) {
        console.error(error);
    }
});


// === user account creation === //

// common error handling for both routes (might only need one)
function handleSignupError(res, error) {
    if (error.name.includes("UniqueConstraint")) {
        const field = error.errors[0].path;
        res.send({
            error: true,
            errorMessage: `That ${field} is already in use`,
        });
    } else if (error.name.includes("ValidationError")) {
        let field = error.errors[0].path;
        if (field === "firstName") field = "first name";
        else if (field === "lastName") field = "last name";
        res.send({
            error: true,
            errorMessage: `Invalid ${field}`,
        });
    } else {
        res.send({
            error: true,
            errorMessage: error.message,
        });
    }
}

// have to manually assign an id due to pk autoIncrement not working as intended
// this is a temporary fix - should try to figure this out when time allows
router.post("/signup", async (req, res) => {
    try {
        // registering a user
        if (req.body.type === "user") {
            req.body.id = (await User.count() + 1);
            const newUser = await User.create(req.body);
            // automatically log them in
            if (newUser?.id) {
                const token = await newUser.generateToken();
                newUser.dataValues.token = token;
                delete newUser.dataValues.password;
                res.send(newUser);
            } else {
                throw new Error("Unable to register user");
            }
        // registering a student
        } else {
            req.body.id = (await Student.count() + 1);
            const newStudent = await Student.create(req.body);
            if (newStudent?.id) {
                res.send(newStudent);
            } else {
                throw new Error("Unable to register student");
            }
        }
    } catch (error) {
        handleSignupError(res, error);
    }
});

module.exports = router;
