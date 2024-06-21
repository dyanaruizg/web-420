/*
  Name: Diana Ruiz Garcia
  File name: app.js
  Date: 6/20/2024
  Description: This application will serve as a platform for managing collections of books.
*/

// Add require statements
const express = require("express");
const createError = require("http-errors");
const path = require('path');

const books = require("../database/books"); // Add the books.js file

const app = express(); // Creates an Express application

app.use(express.json()); // Parse incoming requests as JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse incoming urlencoded payloads
app.use(express.static(path.join(__dirname, 'public'))); // Access static files from the public directory

app.get("/", async (req, res, next) => {
  // HTML content for the landing page
  const html = `
  <html>
  <head>
    <title>In-N-Out-Books</title>
    <style>
      body, h1, h2, h3 { margin: 0; padding: 0; border: 0;}
      body {
        background: #fff;
        margin: 20px 30px;
        color: #9f69e4;
        font-size: 1.25rem;
        font-family: Arial, Helvetica, sans-serif;
      }

      hr {
        width: 100%;
        text-align: left;
        margin-left: 0;
      }

      h2, h3, h4, p {
        color: black;
        margin: 20px 0;
      }

      .topnav a {
        float: left;
        color: black;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 17px;
      }

      .topnav a:hover {
        background-color: #ddd;
        color: black;
      }

      .topnav a.active {
        color: #9f69e4;
      }

      .shopping-cart {
        float: right;
        height: 24px;
        width: 24px;
        padding: 10px;
      }

      .topnav img:hover {
        background-color: #ddd;
      }

      .description {
        text-align: justify;
      }

      .grid-container {
        display: grid;
        grid-template-columns: auto auto auto;
        padding: 10px;
      }

      .grid-item {
        border: 1px solid rgba(0, 0, 0, 0.8);
        padding: 20px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>In-N-Out-Books</h1>
      </header>

      <div class="topnav">
        <a class="active" href="#home">Home</a>
        <a href="#books">Books</a>
        <a href="#ebooks">eBooks</a>
        <a href="#audiobooks">Audiobooks</a>
        <a href="#collectiblebooks">Collectible Books</a>
        <a href="#manga">Manga</a>
        <a href="#bestsellers">Best Sellers</a>
        <a href="#giftcards">Gift Cards</a>
      </div>

      <hr>

      <main>
        <h2>Most anticipated books of summer 2024</h1>
        <p class="description">
          It’s officially summer, which means the living is easy, days
          and legs are stretching out languorously, and you’ve got sunshine
          hours to burn by the pool. (Unless, of course, you’re a parent.)
          But which books should fill your beach bag/backyard/pool house
          library this year? The internet, as always, has the an answer. So
          as usual, I have endeavored to find it.
        </p>
        <p class="description">
          There are noticeably fewer summer reading lists floating around
          this year. It’s possible some outlets are waiting later to run
          their summer reading lists, but it may also be a function of the
          state of online media (crumbling), or the fall of the list (imaginary),
          or something-something AI (possible, very very possible).
        </p>
        <div class="grid-container">
          <div class="grid-item">
            <h3>Die Hot with a Vengance</h3>
            <h4>by Sable Yong</h4>
            <p>Publish Date: July 09, 2024</p>
          </div>
          <div class="grid-item">
            <h3>Men Have Called Her Crazy</h3>
            <h4>by Anna Marie Tendler</h4>
            <p>Publish Date: August 13, 2024</p>
          </div>
          <div class="grid-item">
            <h3>The Midnight Feast</h3>
            <h4>by Lucy Foley</h4>
            <p>Publish Date: June 18, 2024</p>
          </div>
          <div class="grid-item">
            <h3>The Briar Club</h3>
            <h4>by Kate Quinn</h4>
            <p>Publish Date: July 09, 2024</p>
          </div>
          <div class="grid-item">
            <h3>House of Bone and Rain</h3>
            <h4>by Gabino Iglesias</h4>
            <p>Publish Date: August 06, 2024</p>
          </div>
          <div class="grid-item">
            <h3>The Wedding People</h3>
            <h4>by Alison Espach</h4>
            <p>Publish Date: July 30, 2024</p>
          </div>
          <div class="grid-item">
            <h3>Honey</h3>
            <h4>by Isabel Banta</h4>
            <p>Publish Date: June 25, 2024</p>
          </div>
          <div class="grid-item">
            <h3>By Any Other Name</h3>
            <h4>by Jodi Picoult</h4>
            <p>Publish Date: August 20, 2024</p>
          </div>
          <div class="grid-item">
            <h3>The Heart in Winter</h3>
            <h4>by Kevin Barry</h4>
            <p>Publish Date: July 09, 2024</p>
          </div>
        </div>
      </main>
    </div>
  </body>
  </html>
  `; // end HTML content for the landing page
  res.send(html); // Sends the HTML content to the client
});

// Route that returns an array of books from the mock database
app.get("/api/books", async (req, res, next) => {
  try {
    const allBooks = await books.find(); // Find all books
    console.log("All Books: ", allBooks); // Logs all books
    res.send(allBooks); // Sends response with all books
  } catch (err) {
    console.error("Error: ", err.message); // Logs error message
    next(err); // Passes error to the next middleware
  }
});

// Route that returns a single book with the matching id from the mock database
app.get("/api/books/:id", async (req, res, next) => {
  try {
    let { id } = req.params; // Declaring the id property
    id = parseInt(id); // Parsing the string value into a numerical one

    // Check if the id is not a number
    if (isNaN(id)) {
      // Throwing a 400 error if it is not a number
      return next(createError(400, "Input must be a number"));
    }

    const book = await books.findOne({ id: id }); // Find one book
    console.log("Book: ", book); // Logs one book
    res.send(book); // Sends response with one book
  } catch (err) {
    console.error("Error: ", err.message); // Logs error message
    next(err); // Passes error to the next middleware
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  res.json({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  });
});

module.exports = app;