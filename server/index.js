const port = process.env.PORT || 3000;
const app = require("./app");
const { syncAndSeed, db } = require("./db");
require('dotenv').config();

const init = async () => {
    if (process.env.npm_lifecycle_event.startsWith("dev:")) {
        await db.sync();
    } else {
        await syncAndSeed();
    }
    app.listen(port, ()=> console.log(`listening on port ${port}`));
};

init();
