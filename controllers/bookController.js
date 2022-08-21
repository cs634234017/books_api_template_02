const db = require("../config/db");

//Get all books
const getBooks = function (req, res) {

  res.setHeader("Content-Type", "application/json");

  db.query("SELECT * FROM books", function (error, results, fields) {
    if (error) {
      return res
        .status(error.statusCode || 500)
        .send({ error: true, message: error.code + ": " + error.message });
    }

    return res
      .status(200)
      .send({ error: false, message: "books list", data: results });
  });

};

//Get a book by id
const getBookbyId = function (req, res) {

  res.setHeader("Content-Type", "application/json");

  var bookid = Number(req.params.bookid);

  db.query(
    "SELECT * FROM books where bookid=?",
    bookid.toString(),
    function (error, results, fields) {
      if (error) {
        return res
          .status(error.statusCode || 500)
          .send({ error: true, message: error.code + ": " + error.message });
      }

      return res.status(200).send({
        error: false,
        message: "book id = " + bookid.toString(),
        data: results,
      });
    }
  );

};

//Delete a book by id
const deleteBookbyId = function (req, res) {

  res.setHeader("Content-Type", "application/json");

  var bookid = Number(req.params.bookid);

  db.query(
    "DELETE FROM books where bookid=?",
    bookid,
    function (error, results, fields) {
      if (error) {
        return res
          .status(error.statusCode || 500)
          .send({ error: true, message: error.code + ": " + error.message });
      }

      return res.status(200).send({
        error: false,
        message: "Delete book id = " + bookid.toString(),
        data: results,
      });
    }
  );

};

//Add new book
const addBook = function (req, res) {

  res.setHeader("Content-Type", "application/json");

  var bookidValue = req.body.bookid;
  var titleValue = req.body.title;
  var shortDescriptionValue = req.body.shortDescription;
  var authorValue = req.body.author;
  var categoryValue = req.body.category;
  var isbnValue = req.body.isbn;
  var pageCountValue = req.body.pageCount;
  var priceValue = req.body.price;
  var publishedDateValue = req.body.publishedDate;
  var thumbnailUrlValue = req.body.thumbnailUrl;

  db.query(
    `INSERT INTO books 
      (bookid,title,price, isbn, pageCount, publishedDate, thumbnailUrl, 
      shortDescription, author, category) 
      VALUES ( ${bookidValue},'${titleValue}',${priceValue}, '${isbnValue}', ${pageCountValue}, '${publishedDateValue}', '${thumbnailUrlValue}', 
      '${shortDescriptionValue}', '${authorValue}', '${categoryValue}');`,
    function (error, results, fields) {
      if (error) {
        return res
          .status(error.statusCode || 500)
          .send({ error: true, message: error.code + ": " + error.message });
      }

      return res.status(201).send({ error: false, message: "New book added" });
    }
  );

};

//Edit a book by id
const updateBookbyId = function (req, res) {

  res.setHeader("Content-Type", "application/json");

  var bookidValue = Number(req.params.bookid);
  var titleValue = req.body.title;
  var shortDescriptionValue = req.body.shortDescription;
  var authorValue = req.body.author;
  var categoryValue = req.body.category;
  var isbnValue = req.body.isbn;
  var pageCountValue = req.body.pageCount;
  var priceValue = req.body.price;
  var publishedDateValue = req.body.publishedDate;
  var thumbnailUrlValue = req.body.thumbnailUrl;

  db.query(
    `UPDATE books 
          SET 
                title='${titleValue}', 
                price=${priceValue},
                isbn= '${isbnValue}', 
                pageCount=${pageCountValue}, 
                publishedDate='${publishedDateValue}', 
                thumbnailUrl='${thumbnailUrlValue}', 
                shortDescription='${shortDescriptionValue}', 
                author='${authorValue}', 
                category= '${categoryValue}'
          WHERE bookid=?`,
    bookidValue,
    function (error, results, fields) {
      if (error) {
        return res
          .status(error.statusCode || 500)
          .send({ error: true, message: error.code + ": " + error.message });
      }

      return res
        .status(200)
        .send({
          error: false,
          message: "Edit book id = " + bookidValue.toString(),
          data: results,
        });
    }
  );

};

module.exports = {
  getBooks,
  getBookbyId,
  addBook,
  updateBookbyId,
  deleteBookbyId,
};
