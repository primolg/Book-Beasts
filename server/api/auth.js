const router = require('express').Router();
const { User } = require('../db');

// verifies token
router.get("/", async (req, res) => {
    try {
        const user = await User.findByToken(req.headers.authorization);
        if (user) {
            delete user.dataValues.password;
            res.send(user);
        } else {
            throw new Error("Unable to verify token");
        }
    } catch (error) {
        console.error(error);
    }
});

// verifies user credentials, returns token
// note: token is empty string if user does not exist
router.post("/login", async (req, res) => {
    try {
        const user = await User.authenticate(req.body);
        res.send(user);
    } catch (error) {
        console.error(error);
    }
});

// adds user to database, returns token
router.post("/signup", async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        const token = await newUser.generateToken();
        res.send(token);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
