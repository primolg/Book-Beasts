const router = require('express').Router();
const { User, Student } = require('../db');

// verifies token, returns associated user
router.get("/", async (req, res) => {
    try {
        const user = await User.findByToken(req.headers.authorization);
        if (user) {
            res.send(filterUserData(user));
        } else {
            throw new Error("Unable to verify token");
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
        res.send(filterUserData(user));
    } catch (error) {
        console.error(error);
    }
});

// adds user to database, returns newly created user
router.post("/signup", async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        if (newUser?.id) {
            const token = await newUser.generateToken();
            res.send(filterUserData(newUser, token));
        } else {
            throw new Error("Unable to register new user");
        }
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
