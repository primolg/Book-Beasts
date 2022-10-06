const { User } = require('../db');


const requireToken = async (req, res, next) => {
    try{
    const token = req.headers.authorization
    const user = await User.byToken(token);
    req.user = user
    }catch(error){
        next(error);
    }
}

const isAdmin = async(req, res, next) => {
    try{
    if(!req.user.isAdmin) {
        console.log('NOT AN ADMIN');
        res.status(403).send('not an admin')
    }
    }catch(error){
        next(error);
    }
};

module.exports = {
    isAdmin,
    requireToken,
}