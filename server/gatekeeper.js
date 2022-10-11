// functions to ensure routes are protected
const { User, Student } = require("./db");

// verifies USER token before giving access to a route
async function requireUserToken(req, res) {
    try {
        const user = await User.findByToken(req.headers.authorization);
        if (user?.id) req.user = user;
        else throw new Error("No access: Invalid token");
    } catch (error) {
        res.status(403).send(error.message);
    }
}

// verifies STUDENT token before giving access to a route
async function requireStudentToken(req, res) {
    try {
        const user = await Student.findByToken(req.headers.authorization);
        if (user?.id) req.user = user;
        else throw new Error("No access: Invalid token");   
    } catch (error) {
        res.status(403).send(error.message);
    }
}

// follows the previous checks to verify admin status
async function isAdmin(req, res) {
    try {
        if (!req.user.isAdmin) {
            throw new Error("No access: User does not have admin privileges");
        }
    } catch (error) {
        res.status(403).send(error.message);
    }
}

module.exports = { requireUserToken, requireStudentToken, isAdmin };
