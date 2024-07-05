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