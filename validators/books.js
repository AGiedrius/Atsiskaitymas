const { body } = require("express-validator");
const { getBookByTitle } = require("../models/bookModel");

const bookValidator = [
  body("title")
    .optional()
    .isString()
    .custom(async (value) => {
      const book = await getBookByName(value);
      if (book) {
        throw new Error("This book already exists");
      }
      return true;
    }),
];
module.exports = bookValidator;
