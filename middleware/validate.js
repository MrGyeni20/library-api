const { body, validationResult } = require('express-validator');

const saveBook = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required'),
  body('isbn')
    .trim()
    .notEmpty()
    .withMessage('ISBN is required')
    .matches(/^(?:\d{10}|\d{13})$/)
    .withMessage('ISBN must be 10 or 13 digits'),
  body('publishedYear')
    .notEmpty()
    .withMessage('Published year is required')
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage('Published year must be a valid year'),
  body('genre')
    .trim()
    .notEmpty()
    .withMessage('Genre is required'),
  body('pages')
    .notEmpty()
    .withMessage('Pages is required')
    .isInt({ min: 1 })
    .withMessage('Pages must be a positive number'),
  body('publisher')
    .trim()
    .notEmpty()
    .withMessage('Publisher is required'),
  body('language')
    .trim()
    .notEmpty()
    .withMessage('Language is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const saveAuthor = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('First name must be between 1 and 100 characters'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Last name must be between 1 and 100 characters'),
  body('birthDate')
    .notEmpty()
    .withMessage('Birth date is required')
    .isISO8601()
    .withMessage('Birth date must be a valid date'),
  body('nationality')
    .trim()
    .notEmpty()
    .withMessage('Nationality is required'),
  body('biography')
    .trim()
    .notEmpty()
    .withMessage('Biography is required')
    .isLength({ min: 10 })
    .withMessage('Biography must be at least 10 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('website')
    .trim()
    .optional()
    .isURL()
    .withMessage('Must be a valid URL'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  saveBook,
  saveAuthor
};