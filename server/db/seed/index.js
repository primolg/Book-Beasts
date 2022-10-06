const gen = require("./generate")

// 'str' for procedural generation, 'scale' for number of itms to generate
function generateDummyData(str="abcdefg", scale=1, isTest=false) {
    const [users, students] = gen.users(str, scale);
    const [books, pages] = gen.content(str); // 24 books, 240 pages
    return { users, students, books, pages };
}

module.exports = generateDummyData;
