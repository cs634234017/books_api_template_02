const router = require("express").Router();

const bookController = require("../controllers/bookController");

router.route("/").get(bookController.getBooks).post(bookController.addBook);

router
  .route("/:bookid/")
  .get(bookController.getBookbyId)
  .put(bookController.updateBookbyId)
  .delete(bookController.deleteBookbyId);

module.exports = router;
