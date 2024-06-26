/*
  Name: Diana Ruiz Garcia
  File name: app.spec.js
  Description: Test-Driven Development (TDD)
*/

// Add require statements for the app.js file and supertest
const app = require("../src/app");
const request = require("supertest");

// Create a new test suite using Jest’s describe method
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

  // Check if a 400 error is returned when the ID is not a number.
  it("should return a 400 error if the id is not a number", async () => {
    const res = await request(app).get("/api/recipes/foo");

    expect(res.statusCode).toEqual(400); // Check 400 status code
    // Check the response body message to equal “Input must be a number”
    expect(res.body.message).toEqual("Input must be a number");
  });
});