// functions to ensure routes are protected
const { User, Student } = require("./db");

// verifies token before giving access to a route
const requireToken = async(req, res, next) => {
    try {
        let user = await User.findByToken(req.headers.authorization);
        if (!user) user = await Student.findByToken(req.headers.authorization);

        if (user) {
            req.user = user;
        } else {
            throw new Error("Invalid user");
        }
    } catch (error) {
        next(error);
    }
}

const isAdmin = async(req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            throw new Error("User does not have admin access");
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { requireToken, isAdmin };
