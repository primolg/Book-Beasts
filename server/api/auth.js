const router = require('express').Router();
const { User, Student } = require('../db');

// verifies token, returns associated user (might need refactor later)
router.get("/", async (req, res) => {
    try {
        let user = await User.findByToken(req.headers.authorization);
        if (user) {
            res.send(user);
        } else {
            user = await Student.findByToken(req.headers.authorization);
            if (user) {
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

// adds user to database, returns newly created user
router.post("/signup", async (req, res) => {
    try {
        // have to manually assign an id due to pk autoIncrement not working as intended
        // temporary fix - should try to figure this out when time allows
        req.body.id = (await User.count() + 1);

        const newUser = await User.create(req.body);
        if (newUser?.id) {
            const token = await newUser.generateToken();
            newUser.dataValues.token = token;
            delete newUser.dataValues.password;
            res.send(newUser);
        } else {
            throw new Error("Unable to register new user");
        }
    } catch (error) {
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
        }
    }
});

module.exports = router;
