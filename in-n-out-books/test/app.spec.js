/*
  Name: Diana Ruiz Garcia
  File name: app.spec.js
  Date: 6/20/2024
  Description: Unit tests for each route implemented in the app.js file
  using Jest.
*/

// Add require statements
const app = require("../src/app");
const request = require("supertest");

// Create a new test suite for Chapter 3
describe("Chapter 3: API Tests", () => {
  // Define a unit test that checks if the /api/books endpoint returns
  // an array of books
  it("it should return an array of books", async () => {
    // Sends a GET request to the /api/books endpoint and waits for a
    // response, using the supertest npm package
    const res = await request(app).get("/api/books");
    // Check if the response status code is 200
    expect(res.statusCode).toEqual(200);
    // Check if the response body is array
    expect(res.body).toBeInstanceOf(Array);

    // Check every recipe in the response body to ensure it has
    // properties for id, name, and ingredients
    res.body.forEach((recipe) => {
      expect(recipe).toHaveProperty("id");
      expect(recipe).toHaveProperty("title");
      expect(recipe).toHaveProperty("author");
    });
  });

  // Define a unit test to check if a single book is returned when a
  // client calls the endpoint: /api/books/:id
  it("should return a single book", async () => {
    // Sends a GET request to /api/books/:id endpoint and waits for a
    // response, using the supertest npm package
    const res = await request(app).get("/api/books/1");
    // Check if the response status code is 200
    expect(res.statusCode).toEqual(200);
    // Check the response body to have the property passed in key-value property
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("title", "The Fellowship of the Ring");
    expect(res.body).toHaveProperty("author", "J.R.R. Tolkien");
  });

  // Define a unit test that checks if the /api/books/:id endpoint
  // returns a 400 status code when the ID is not a number
  it("should return a 400 error if the id is not a number", async () => {
    // Send a GET request to the /api/books/:id endpoint and waits for a
    // response using the supertest npm package
    const res = await request(app).get("/api/books/heart");
    // Check if the response status code is 400
    expect(res.statusCode).toEqual(400);
    // Check if the response message is “Input must be a number”.
    expect(res.body.message).toEqual("Input must be a number");
  });
});

// Create a new test suite for Chapter 4
describe("Chapter 4: API Tests", () => {
  // Define a unit test that checks if the /api/books POST endpoint returns
  // a 201 status code for successful creations
  it("should return a 201-status code when adding a new book", async () => {
    // Send a POST request to the /api/books endpoint and waits for a
    // response using the supertest npm package
    const res = await request(app).post("/api/books").send({
      id: 29,
      title: "A Death in Cornwall",
      author: "Daniel Silva",
    });

    // Check if the response status code is 201
    expect(res.statusCode).toEqual(201);
  });

  // Define a unit test that checks if the /api/recipes POST endpoint returns
  // a 400 status code with a message of “Bad Request” when adding a new book
  // with missing title
  it("should return a 400-status code when adding a new book with missing title",
  async () => {
    // Send a POST request to the /api/books endpoint and waits for a
    // response using the supertest npm package
    const res = await request(app).post("/api/books").send({
      id: 30,
      author: "Penn Cole"
    });

    // Check if the response status code is 400
    expect(res.statusCode).toEqual(400);
    // Check if the response body has a property named message with a value of
    // “Bad Request”
    expect(res.body.message).toEqual("Bad Request");
  });

  // Define a unit test that checks if the /api/books/:id endpoint returns a
  // 204 status code when deleting book from the mock database
  it("should return a 204-status code when deleting a book", async () => {
    // Send a DELETE request to the /api/books/:id endpoint and waits for a
    // response using the supertest npm package
    const res = await request(app).delete("/api/books/29");

    // Check if the response status code is 204
    expect(res.statusCode).toEqual(204);
  });
});

// Create a new test suite for Chapter 5: API Tests
describe("Chapter 5: API Tests", () => {
  // Add a unit test that checks if a 204 status code is returned when a book is
  // successfully updated
  it("should update a book and return a 204-status code", async () => {
    // Send a PUT request to the /api/books/:id endpoint and waits for a
    // response using the supertest npm package
    const res = await request(app).put("/api/books/5").send({
      title: "The New Shadow",
      author: "J.R.R. Tolkien"
    })

    // Check if the response status code is 204 for successful update
    expect(res.statusCode).toEqual(204);
  });

  // Add a unit test that checks if a 400 error is return when the ID is not a number
  it("should return a 400-status code when using a non-numeric id",
  async () => {
    // Send a PUT request to the /api/books/:id endpoint and waits for a
    // response using the supertest npm package
    const res = await request(app).put("/api/books/foo").send({
      title: "The New Shadow",
      author: "J.R.R. Tolkien"
    });

    // Check if the response status code is 400 for errors
    expect(res.statusCode).toEqual(400);
    // Check if the response body message is "Input must be a number"
    expect(res.body.message).toEqual("Input must be a number");
  });

  // Add a unit test that checks if a 400 error is returned when updating a book
  // with a missing title
  it("should return a 400-status code when updating a book with a missing title",
  async () => {
    // Send a PUT request to the /api/books/:id endpoint and waits for a
    // response using the supertest npm package
    const res = await request(app).put("/api/books/1").send({
      author: "J.R.R. Tolkien"
    });

    // Check if the response status code is 400 for errors
    expect(res.statusCode).toEqual(400);
    // Check if the response body message is "Bad Request"
    expect(res.body.message).toEqual("Bad Request");
  });
});

// Create a new test suite for Chapter 6: API Tests
describe("Chapter 6: API Tests", () => {
  // Add a unit test to check if a 200 status code is returned with a message of
  // "Authentication successful" when log a user in.
  it("should log a user in and return a 200-status with 'Authentication " +
  "successful' message", async () => {
    // Send a POST request to /api/login endpoint and waits for a response
    // using the supertest npm package
    const res = await request(app).post("/api/login").send({
      email: "harry@hogwarts.edu",
      password: "potter"
    });

    expect(res.statusCode).toEqual(200); // Check if the status code is 200
    // Check if the response body has a message of “Registration successful”
    expect(res.body.message).toEqual("Authentication successful");
  });

  // Add a new unit test to check if a 401 status code is returned with the message
  // 'Unauthorized' when logging in with incorrect credentials.
  it("should return a 401-status code with 'Unauthorized' message when logging " +
  "in with incorrect credentials", async () => {
    // Send a POST request to /api/login endpoint and waits for a response
    // using the supertest npm package
    const res = await request(app).post("/api/login").send({
      email: "harry@hogwarts.edu",
      password: "hogwarts"
    });

    expect(res.statusCode).toEqual(401); // Check if the status code is 401
    // Check if the response body has a message of "Unauthorized"
    expect(res.body.message).toEqual("Unauthorized");
  });

  // Add a unit test to check if a status code of 400 is returned with a message
  // of “Bad Request” when  missing email or password.
  it("should return a 400 status code with 'Bad Request' when missing email " +
  "or password", async () => {
    // Send a POST request to /api/login endpoint and waits for a response
    // using the supertest npm package
    const res = await request(app).post("/api/login").send({
      email: "harry@hogwarts.edu"
    });

    expect(res.statusCode).toEqual(400); // Check if the status code is 400
    // Check if the response body has a message of “Bad Request”
    expect(res.body.message).toEqual("Bad Request");
  });
});

// Create a new test suite for Chapter 7: API Tests
describe("Chapter 7: API Tests", () => {
  // Define a unit test that checks if a 200 status code is returned with a
  // message of “Security questions successfully answered”.
  it("should return a 200 status with 'Security questions successfully answered' " +
  "message", async() => {
    // Send a POST request to /api/users/:email/verify-security-question endpoint
    // and waits for a response, using the supertest npm package.
    const res = await request(app)
    .post("/api/users/hermione@hogwarts.edu/verify-security-question").send({
      securityQuestions: [
        { answer: "Crookshanks" },
        { answer: "Hogwarts: A History" },
        { answer: "Wilkins" }
      ]
    });

    // Check if the response status code is 200
    expect(res.statusCode).toEqual(200);
    // Check if the respond body has a message of "Security questions successfully
    // answered"
    expect(res.body.message).toEqual("Security questions successfully answered");
  });

  // Define a unit test that checks if a 400 status code with a message of
  // “Bad Request” is returned when the request body fails ajv validation.
  it("should return a 400 status code with 'Bad Request' message when the " +
  "request body fails ajv validation", async() => {
    // Send a POST request to /api/users/:email/verify-security-question endpoint
    // and waits for a response, using the supertest npm package.
    const res = await request(app)
    .post("/api/users/hermione@hogwarts.edu/verify-security-question").send({
      securityQuestions: [
        { answer: "Crookshanks", question: "What is your pet's name?" },
        { answer: "Hogwarts: A History", teacher: "Minerva McGonagall" }
      ]
    });

    // Check if the response status code is 400
    expect(res.statusCode).toEqual(400);
    // Check if the response body has a message of “Bad Request”
    expect(res.body.message).toEqual("Bad Request");
  });

  // Define a unit test that checks if a 401 error is returned with a message of
  // “Unauthorized” when the security answers are incorrect.
  it("should return a 401 status code with 'Unauthorized' message when the " +
  "security answers are incorrect", async() => {
    // Send a POST request to /api/users/:email/verify-security-question endpoint
    // and waits for a response, using the supertest npm package.
    const res = await request(app)
    .post("/api/users/hermione@hogwarts.edu/verify-security-question").send({
      securityQuestions: [
        { answer: "Hedwig" },
        { answer: "The Quibbler" },
        { answer: "Wilkins" }
      ]
    });

    // Check if the response status code is 401
    expect(res.statusCode).toEqual(401);
    // Check if the response body has a message of "Unauthorized"
    expect(res.body.message).toEqual("Unauthorized");
  });
});