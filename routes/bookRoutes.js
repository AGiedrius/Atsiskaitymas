const express = require('express');
const {
  getAllBooks,
  getFilteredBooks,
  getBookById,
  createBook,
  updateBook,
} = require('../controlers/bookControler');
const paginationValidator = require('../validators/pagination');
const validate = require('../validators/validate');
const filterValidator = require('../validators/filter');
const bookValidator = require('../validators/books');
const { protect } = require('../controlers/authControler');
const { allowAccessTo } = require('../controlers/authControler');

//middleware for specific route, only for delete
const midlewareForDeleteBook = (req, res, next) => {
  console.log('Hello from the middleware for delete book');
  next();
};

// sukuriame ir pervardiname bookRouter tiesiog į router
const router = express.Router();

// deklaruojame, aprašome book  routes, svarbi routs eilės tvarka
router
  .route('/')
  .get(getAllBooks)
  .post(protect, bookValidator, validate, createBook); // General base route
router.route('/filter').get(filterValidator, validate, getFilteredBooks);

router.route('/category/:category/difficulty/:difficulty'); // Specific route for category and difficulty

router
  .route('/:id') // General dynamic route for book by ID
  .get(getBookById)
  .put(updateBook);

module.exports = router;
