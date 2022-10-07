// security methods are the same for both User/Student models, so they can be consolidated here
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();

const hashPassword = async function(user) {
    user.password = await bcrypt.hash(user.password, 10);
}

const authenticate = (model) => async({ key, password }) => {
    try {
        let user;
        if (key.includes("@")) {
            user = await model.findOne({
                where: { email: key }
            });
        } else {
            user = await model.findOne({
                where: { username: key }
            });
        }
        // if the user cannot be found, return an object with null token
        if (!user) return { token: null };

        // if the user is found but password incorrect, return username with null token
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return { username: user.username, token: null };

        // if all credentials are valid, return user object with token attached
        if (isPasswordValid) {
            const token = user.generateToken();
            user.dataValues.token = token;
            delete user.dataValues.password;
            return user;
        } else {
            throw new Error("Password invalid");
        }
    } catch (error) {
        console.error(error);
    }
}

function generateToken() {
    try {
        return jwt.sign({ id: this.id }, process.env.JWT);
    } catch (error) {
        console.error(error);
    }
}

const findByToken = (model) => async(token) => {
    try {
        const { id } = jwt.verify(token, process.env.JWT);
        const user = await model.findByPk(id);
        if (user) {
            return user;
        } else {
            throw new Error("Invalid token");
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    hashPassword,
    authenticate,
    generateToken,
    findByToken,
}
