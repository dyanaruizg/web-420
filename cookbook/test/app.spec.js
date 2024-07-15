/*
  Name: Diana Ruiz Garcia
  File name: app.spec.js
  Description: Test-Driven Development (TDD)
*/

// Add require statements for the app.js file and supertest
const app = require("../src/app");
const request = require("supertest");

// Create a new test suite for Chapter 3: API Tests using Jest’s describe method
describe("Chapter 3: API Tests", () => {
  // Check if an array of recipes is returned when a client calls the endpoint: /api/recipes
  it("it should return an array of recipes", async () => {
    const res = await request(app).get("/api/recipes");

    expect(res.statusCode).toEqual(200); // Check 200 status code
    expect(res.body).toBeInstanceOf(Array); // Check the response body should be an instance of an array

    // Check each item in the array should have the following properties: id, name, and ingredients
    res.body.forEach((recipe) => {
      expect(recipe).toHaveProperty("id");
      expect(recipe).toHaveProperty("name");
      expect(recipe).toHaveProperty("ingredients");
    });
  });

  // Check if a single recipe is returned when a client calls the endpoint: /api/recipes/:id
  it("should return a single recipe", async () => {
    const res = await request(app).get("/api/recipes/1");

    expect(res.statusCode).toEqual(200); // Check 200 status code

    // Check the response body should have properties id, name, and ingredients
    // For ID 1, the ingredients should have values: flour, milk, and eggs
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("name", "Pancakes");
    expect(res.body).toHaveProperty("ingredients", ["flour", "milk", "eggs"]);
  });

  // Check if a 400 error is returned when the ID is not a number
  it("should return a 400 error if the id is not a number", async () => {
    const res = await request(app).get("/api/recipes/foo");

    expect(res.statusCode).toEqual(400); // Check 400 status code
    // Check the response body message to equal “Input must be a number”
    expect(res.body.message).toEqual("Input must be a number");
  });
});

// Create a new test suite for Chapter 4: API Tests
describe("Chapter 4: API Tests", () => {
  // Add a unit test that checks if the /api/recipes POST endpoint returns a 201
  // status code for successful creations
  it("should return a 201 status code when adding a new recipe", async () => {
    const res = await request(app).post("/api/recipes").send({
      id: 99,
      name: "Grilled Cheese",
      ingredients: ["bread", "cheese", "butter"],
    });

    expect(res.statusCode).toEqual(201); // Check 201 status code
  });

  // Add a unit test that checks if a 400 error is returned with a message of
  // ‘Bad Request’ when adding a new recipe with missing name
  it("should return a 400 status code when adding a new recipe with missing name",
  async () => {
    const res = await request(app).post("/api/recipes").send({
      id: 100,
      ingredients: ["bread", "cheese", "butter"]
    });

    expect(res.statusCode).toEqual(400); // Check 400 status code
    // Check the response body message to equal ‘Bad Request’
    expect(res.body.message).toEqual("Bad Request");
  });

  // Add a unit test to check if 204 status code is returned when deleting a recipe
  it("should return a 204 status code when deleting a recipe", async () => {
    const res = await request(app).delete("/api/recipes/99");

    expect(res.statusCode).toEqual(204); // Check 204 status code
  });
});

// Create a new test suite for Chapter 5: API Tests
describe("Chapter 5: API Tests", () => {
  // Add a unit test that checks if a 204 status code is returned when a recipe is
  // successfully updated
  it("should return a 204 status code when updating a recipe", async () => {
    const res = await request(app).put("/api/recipes/1").send({
      name: "Pancakes",
      ingredients: ["flour", "milk", "eggs", "sugar"]
    })

    expect(res.statusCode).toEqual(204); // Check 204 status code
  });

  // Add a unit test that checks if a 400 error is return when the ID is not a number
  it("should return a 400 status code when updating a recipe with a non-numeric id",
  async () => {
    const res = await request(app).put("/api/recipes/foo").send({
      name: "Test Recipe",
      ingredients: ["test", "test"]
    });

    expect(res.statusCode).toEqual(400); // Check 400 status code
    // Check the response body message to equal “Input must be a number”
    expect(res.body.message).toEqual("Input must be a number");
  });

  // Add a unit test that checks if a 400 error is returned when updating a recipe
  // with missing or extra keys
  it("should return a 400 status code when updating a recipe with missing keys or extra keys",
  async () => {
    const res = await request(app).put("/api/recipes/1").send({
      name: "Test Recipe"
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Bad Request");

    const res2 = await request(app).put("/api/recipes/1").send({
      name: "Test Recipe",
      ingredients: ["test", "test"],
      extraKey: "extra"
    });

    expect(res2.statusCode).toEqual(400); // Check 400 status code
    // Check the response body message to equal “Bad Request”
    expect(res2.body.message).toEqual("Bad Request");
  });
});

// Create a new test suite for Chapter 6: API Tests
describe("Chapter 6: API Tests", () => {
  // Add a unit test to check if a 200 status code is returned with a message of
  // “Registration successful” when registering a new user.
  it("should return a 200 status code with a message of 'Registration successful' " +
  "when registering a new user", async () => {
    const res = await request(app).post("/api/register").send({
      email: "cedric@hogwarts.edu",
      password: "diggory"
    });

    expect(res.statusCode).toEqual(200); // Check 200 status code
    // Check if the response body has a message of “Registration successful”
    expect(res.body.message).toEqual("Registration successful");
  });

  // Add a new unit test to check if a 409 status code is returned with the message
  // “Conflict” when registering a user with a duplicate email address.
  it("should return a 409 status code with a message of 'Conflict' when registering " +
  "a user with a duplicate email", async () => {
    const res = await request(app).post("/api/register").send({
      email: "harry@hogwarts.edu",
      password: "potter"
    });

    expect(res.statusCode).toEqual(409); // Check 409 status code
    // Check if the response body message has a message of “Conflict”
    expect(res.body.message).toEqual("Conflict");
  });

  // Add a unit test to check if a status code of 400 is returned with a message
  // of “Bad Request” when using too many or too few parameter values.
  it("should return a 400 status code when registering a new user with too many " +
  "or too few parameter values", async () => {
    const res = await request(app).post("/api/register").send({
      email: "cedric@hogwarts.edu",
      password: "diggory",
      extraKey: "extra"
    });

    expect(res.statusCode).toEqual(400); // Check 400 status code
    // Check if the response body has a message of “Bad Request”
    expect(res.body.message).toEqual("Bad Request");

    const res2 = await request(app).post("/api/register").send({
      email: "cedric@hogwarts.edu"
    });

    expect(res2.statusCode).toEqual(400); // Check 400 status code
    // Check if the response body has a message of “Bad Request”
    expect(res2.body.message).toEqual("Bad Request");
  });
});

// Create a new test suite for Chapter 7: API Tests
describe("Chapter 7: API Tests", () => {
  // Define a unit test that checks if a 200 status code is returned with a message
  // of “Password reset successful” when resetting a password.
  it("should return a 200 status code with a message of 'Password reset " +
  "successful' when resetting a user's password", async() => {
    // Send a POST request to /api/users/:email/password-reset endpoint and waits
    // for a response, using the supertest npm package.
    const res = await request(app).post("/api/users/harry@hogwarts.edu/reset-password").send({
      securityQuestions: [
        { answer: "Hedwig" },
        { answer: "Quidditch Through the Ages" },
        { answer: "Evans" }
      ],
      newPassword: "password"
    });

    // Check if the response status code is 200
    expect(res.statusCode).toEqual(200);
    // Check if the respond body has a message of "Password reset successful"
    expect(res.body.message).toEqual("Password reset successful");
  });

  // Define a unit test that checks if a 400 status code with a message of “Bad Request”
  // is returned when the request body fails ajv validation.
  it("should return a 400 status code with a message of 'Bad Request' when the " +
  "request body fails ajv validation", async() => {
    // Send a POST request to /api/users/:email/password-reset endpoint and waits
    // for a response, using the supertest npm package.
    const res = await request(app).post("/api/users/harry@hogwarts.edu/reset-password").send({
      securityQuestions: [
        { answer: "Hedwig", question: "What is your pet's name?" },
        { answer: "Quidditch Through the Ages", myName: "Harry Potter" }
      ],
      newPassword: "password"
    });

    // Check if the response status code is 400
    expect(res.statusCode).toEqual(400);
    // Check if the response body has a message of “Bad Request”
    expect(res.body.message).toEqual("Bad Request");
  });

  // Define a unit test that checks if a 401 error is returned with a message of “Unauthorized”
  // when the security answers are incorrect.
  it("should return a 401 status code with a message of 'Unauthorized' when the " +
  "security answers are incorrect", async() => {
    // Send a POST request to /api/users/:email/password-reset endpoint and waits
    // for a response, using the supertest npm package.
    const res = await request(app).post("/api/users/harry@hogwarts.edu/reset-password").send({
      securityQuestions: [
        { answer: "Fluzy" },
        { answer: "Quidditch Through the Ages" },
        { answer: "Evans" }
      ],
      newPassword: "password"
    });

    // Check if the response status code is 401
    expect(res.statusCode).toEqual(401);
    // Check if the response body has a message of "Unauthorized"
    expect(res.body.message).toEqual("Unauthorized");
  });
});