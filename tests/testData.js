// should generate test data with the seed data generator
const data = {
    "users": [
        {
            email: "jimmyjohn@gmail.com",
            username: "jimmyjohn",
            firstName: "Jimmy",
            lastName: "John",
            password: "password",
        },
        {
            email: "hungrycaterpillar@gmail.com",
            username: "hungrycaterpillar",
            firstName: "Eric",
            lastName: "Carle",
            password: "hungry",
            isAdmin: true,
        }
    ],
    "children": [
        // todo
    ],
    "books": [
        {
            id: 1,
            title: "The Crocodile's Hat"
        },
        {
            id: 2,
            title: "The Hungry Caterpillar",
        }

    ],
    "pages": [
        {
            id: 1,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            bookId: 1,
            nextPage: 2,
        },
        {
            id: 2,
            content: "Vitae tempus quam pellentesque nec nam aliquam sem.",
            bookId: 1,
            previousPage: 1,
            nextPage: 3,
        },
        {
            id: 3,
            content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            bookId: 1,
            previousPage: 2,
            nextPage: 4,
        },
        {
            id: 4,
            content: "Consectetur adipiscing elit, labore et dolore magna aliqua.",
            bookId: 1,
            previousPage: 3,
            nextPage: 5,
        },
        {
            id: 5,
            content: "Quam pellentesque nec nam magna aliqua.",
            bookId: 1,
            previousPage: 4,
        }
    ],
    "tags": [
        // todo
    ]
}

module.exports = data;
