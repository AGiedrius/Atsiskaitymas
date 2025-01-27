const { query } = require('express-validator');
const { getDifficultyById } = require('../models/bookModel');

const filterValidator = [
  query('duration')
    .optional()
    .isInt({ min: 1, max: 10 }) // must be an integer >= 1
    .withMessage('Duration must be a positive integer') // error message
    .toInt(), //convert to integer

  query('price')
    .optional()
    .isCurrency({ allow_negatives: false, digits_after_decimal: [2] })
    .withMessage('Price must be a positive decimal'), // error message

  query('difficulty')
    .optional()
    .isString()
    .isIn(['easy', 'medium', 'hard']) // allowing 1 of this values
    .withMessage('Difficulty must be one of this: easy, hard, medium'), // error message

  query('sort')
    .optional()
    .toUpperCase() //convert to uppercase
    .isIn(['ASC', 'DESC']) // allowing 1 of this values,
    .withMessage('Sort must be ASC or DESC'), // error message
];

module.exports = filterValidator;
