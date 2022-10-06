const data = require("./data.json");

const customAdmin = {
    username: "a",
    password: "a",
    email: "abc@gmail.com",
    firstName: "Ms",
    lastName: "Piggy",
    username: "mspiggy",
    isAdmin: true,
}

function fixCase(str) {
    return str
        .split(" ")
        .map((item) => {
            return item[0].toUpperCase() + item.slice(1).toLowerCase();
        })
        .join(" ");
}

function iterateNum(num) {
    num *= 4.6;
    while (num > 2) num /= 3;
    if (num < 0.03) num * 20;
    return num >= 1 ? num - 1 : num;
}

function iterateSeed(seed) {
    let seed1 = iterateNum(seed[0]);
    let seed2 = iterateNum(seed[1]);
    if (seed1 < 0.01) seed1 *= 99;
    if (seed2 < 0.01) seed2 *= 99;
    seed[0] = seed1;
    seed[1] = seed2;
    return seed;
}

function createSeed(str) {
    // if (str === undefined) seed = Math.random();
    const parse = "qwertyuiopasdfghjklzxcvbnm"
    let seed1 = str
        .slice(Math.floor(str.length / 2))
        .split("")
        .map(letter => parse.indexOf(letter))
        .reduce((accum, itm) => accum + itm);
    let seed2 = str
        .slice(0, Math.floor(str.length / 2))
        .split("")
        .map(letter => parse.indexOf(letter))
        .reduce((accum, itm) => accum + itm);
    while (seed1 > 1 || seed2 > 1) {
        seed1 /= 7;
        seed2 /= 7;
    }
    return [seed1, seed2];
}

function generatePerson(seed, type) {
    let idx1 = Math.floor(seed[0] * 100 / seed[1]);
    let idx2 = Math.floor(seed[1] * 100 / seed[0]);
    while (idx1 >= data.firstNames.length) {
        idx1 -= data.firstNames.length;
    }
    while (idx2 >= data.lastNames.length) {
        idx2 -= data.lastNames.length;
    }
    const firstName = fixCase(data.firstNames[idx1]);
    const lastName = fixCase(data.lastNames[idx2]);
    const username = `${firstName}${lastName}`.toLowerCase();
    const email = `${username}@gmail.com`

    let age = firstName.length + 2;
    if (age <= 3 || age >= 12) age = 11;
    // every user's password will be "firstname_pass"
    const password = `${firstName.toLowerCase()}_pass`
    
    const person = {
        email,
        username,
        password,
        firstName,
        lastName,
        age,
    }
    switch (type) {
        case "student":
            return person;
        case "teacher":
            delete person.age;
            return person;
        case "admin":
            delete person.age;
            person.isAdmin = true;
            return person;
    }
}

// 'str' as any alphanumeric string which will be converted to a number to seed
// this will allow us to use the same data every time, and generate more iterations later
function generateDummyUsers(str="abcdefg", scale=1) {
    let seed = createSeed(str);
    
    let admins = [];
    let users = [];
    let students = [];
    
    const numberOfAdmins = 3 * scale;
    for (let i = 0; i < numberOfAdmins; i++) {
        const newAdmin = generatePerson(seed, "admin");
        admins.push(newAdmin, true);
        seed = iterateSeed(seed);
    }
    admins[0] = customAdmin;
    const numberOfUsers = 30 * scale;
    for (let i = 0; i < numberOfUsers; i++) {
        const newUser = generatePerson(seed, "teacher")
        users.push(newUser);
        seed = iterateSeed(seed);
    }
    const numberofStudents = 100 * scale;
    for (let i = 0; i < numberofStudents; i++) {
        const newStudent = generatePerson(seed, "student");
        students.push(newStudent);
        seed = iterateSeed(seed);
    }

    return [admins, users, students];
}

let test = generateDummyUsers();
console.log(test);

// module.exports = generateDummyData;
