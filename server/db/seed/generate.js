const data = require("./data.json");

// PROCEDURAL GENERATION UTILS //

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

// USER GENERATION //

const customAdmin = {
    username: "mspiggy",
    password: "password",
    email: "abc@gmail.com",
    firstName: "Ms",
    lastName: "Piggy",
    username: "mspiggy",
    isAdmin: true,
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

// removes users with duplicate emails
function deleteDuplicates(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i].email === arr[j].email)
            arr.splice(j, 1);
        }
    }
    return arr;
}

function generateDummyUsers(str="abcdefg", scale=1) {
    let seed = createSeed(str);

    let users = [];
    let students = [];
    
    const numberOfAdmins = 2 * scale;
    for (let i = 0; i < numberOfAdmins; i++) {
        const newAdmin = generatePerson(seed, "admin");
        users.push(newAdmin);
        seed = iterateSeed(seed);
    }
    users[0] = customAdmin;
    const numberOfUsers = 10 * scale;
    for (let i = 0; i < numberOfUsers; i++) {
        const newUser = generatePerson(seed, "teacher")
        users.push(newUser);
        seed = iterateSeed(seed);
    }
    const numberofStudents = 50 * scale;
    for (let i = 0; i < numberofStudents; i++) {
        const newStudent = generatePerson(seed, "student");
        students.push(newStudent);
        seed = iterateSeed(seed);
    }
    users = deleteDuplicates(users);
    students = deleteDuplicates(students);
    return [users, students];
}

// BOOKS AND PAGES GENERATION //

// i'm sure it's fine if _this_ one is (pseudo) random
function generatePageContent(descriptions) {
    let content = descriptions[Math.floor(Math.random() * descriptions.length)];
    if (Math.random() > 0.8) content += "!";
    else content += ".";
    return content;
}

function createPages(bookId, seed, pageCount=10) {
    let startingId = (bookId + 1) * 10;
    const descriptions = data.lorem.split(". ");
    
    let pages = [];
    for (let i = 0; i < pageCount; i++) {
        const page = {
            id: startingId + i + 1,
            content: generatePageContent(descriptions),
            type: "text",
            previousPage: i===0? null : startingId + i,
            nextPage: i===pageCount-1? null : startingId + i + 2,
            bookId,
        };
        page.childId = Math.floor(seed[0] * 100);
        while (page.childId > 40) page.childId -= 20;
        
        pages.push(page);
        seed = iterateSeed(seed);
    };
    return pages;
}

function createLibrary(seed) {
    const avgTitleLength = (
        data.titles.reduce((accum, title) => accum+title.length, 0)
        / data.titles.length
    );
    
    let pages = [];
    let books = [];
    for (let i = 0; i < data.titles.length; i++) {
        const book = {
            id: i + 1,
            title: data.titles[i],
            isPublished: data.titles[i] > avgTitleLength,
        };
        if (book.title.length > 15) {
            let idx = Math.floor(seed[0] * seed[1] * 10);
            if (idx > data.genres.length) idx = 4;
            book.genre = data.genres[idx];
            seed = iterateSeed(seed);
        };
        book.childId = i * 2 || 1;
        books.push(book);

        const newPages = createPages(book.id, seed);
        pages.push(...newPages);
    }
    return [books, pages];
}

function generateDummyContent(str="abcdefg") {
    let seed = createSeed(str);
    //can implement scale later
    const [books, pages] = createLibrary(seed);
    return [books, pages]
}

module.exports = {
    content: generateDummyContent,
    users: generateDummyUsers,
}
