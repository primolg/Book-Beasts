const db = require("./db");
const data = require("./seed");

// db model relations

const seed = async () => {
    await db.sync({ force: true });
    
    // will seed data here
};

module.exports = {
    db,
    seed,
};
