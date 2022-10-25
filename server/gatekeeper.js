// functions to ensure routes are protected
const { User, Student } = require("./db");

// verifies USER token before giving access to a route
async function requireUserToken(req, res, next) {
    try {
        const user = await User.findByToken(req.headers.authorization);
        if (!user) {
            throw new Error("No access: Invalid token");
        }
        // this prevents users from being able to access each others' data
        else if (user.id != req.params.id) {
            throw new Error("Valid token, incorrect user");
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(403).send(error.message);
    }
}

// verifies STUDENT token before giving access to a route
async function requireStudentToken(req, res, next) {
    try {
        const user = await Student.findByToken(req.headers.authorization);
        if (!user) {
            throw new Error("No access: Invalid token");
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(403).send(error.message);
    }
}

// follows the previous checks to verify admin status
async function isAdmin(req, res, next) {
    try {
        if (!req.user.isAdmin) {
            throw new Error("No access: User does not have admin privileges");
        } else {
            next();
        }
    } catch (error) {
        res.status(403).send(error.message);
    }
}

module.exports = { requireUserToken, requireStudentToken, isAdmin };
