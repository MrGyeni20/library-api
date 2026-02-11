const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate'); 

router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);
router.post('/', validation.saveBook, booksController.createBook); // Remove isAuthenticated
router.put('/:id', validation.saveBook, booksController.updateBook); // Remove isAuthenticated
router.delete('/:id', booksController.deleteBook); // Remove isAuthenticated

module.exports = router;