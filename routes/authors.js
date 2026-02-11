const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Public routes (anyone can view)
router.get('/', authorsController.getAll);
router.get('/:id', authorsController.getSingle);

// Protected routes (must be logged in)
router.post('/', isAuthenticated, validation.saveAuthor, authorsController.createAuthor);
router.put('/:id', isAuthenticated, validation.saveAuthor, authorsController.updateAuthor);
router.delete('/:id', isAuthenticated, authorsController.deleteAuthor);

module.exports = router;