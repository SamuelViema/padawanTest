let express = require('express');
let booksController = require('../controllers/books');

let router = express.Router();

/* Middlewares */
let tokenAccess = require('../middlewares/token_access');

/* Test Routes */

router.get('/test', booksController.test);


/* Use Routes */

router.post('/', tokenAccess, booksController.insertBook);
router.delete('/:id', tokenAccess, booksController.deleteBook);
router.get('/', booksController.getBooks);

module.exports = router;