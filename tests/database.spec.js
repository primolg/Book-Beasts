const { expect } = require("chai");
const {
    syncAndSeed,
    db,
    User,
    Child,
    Book,
    Page,
    Tag,
} = require("../server/db");

// tests to write:
// PAGES linked list method
// database validation (number of characters, alphanumeric, etc)
// unique emails, fields cannot be null

describe("Database functionality", () => {

    beforeEach(async () => {
        await db.sync({ force: true });
    });

    describe("Basic validation", () => {
        it("Can add items to database", async () => {
            // for now, just a simple check to ensure items can be created (relearning how to write mocha/chai)
            const jimmy = await User.create({
                email: "jimmyjohn@gmail.com",
                username: "jimmyjohn",
                firstName: "Jimmy",
                lastName: "John",
                password: "password",
            })
            expect(jimmy.firstName).to.equal(
                "Jimmy",
                "Unable to create a user"
            );
            expect(jimmy.password).to.equal(
                "password",
                "Unable to create a user"
            )
        });
    });

    describe("'Pages' model functions as a linked list", () => {

    });
})