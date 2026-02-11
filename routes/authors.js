const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');
const validation = require('../middleware/validate');
// const { isAuthenticated } = require('../middleware/authenticate'); // COMMENT THIS OUT

router.get('/', authorsController.getAll);
router.get('/:id', authorsController.getSingle);
router.post('/', validation.saveAuthor, authorsController.createAuthor); // Remove isAuthenticated
router.put('/:id', validation.saveAuthor, authorsController.updateAuthor); // Remove isAuthenticated
router.delete('/:id', authorsController.deleteAuthor); // Remove isAuthenticated

module.exports = router;