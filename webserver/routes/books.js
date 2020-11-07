let express = require('express');
let booksController = require('../controllers/books');

let router = express.Router();

/* Middlewares */
let tokenAccess = require('../middlewares/token_access');

/* Test Routes */

router.get('/test', booksController.test);


/* Use Routes */

router.get('/', booksController.getBooks);
router.post('/', tokenAccess, booksController.insertBook);
router.delete('/:id', tokenAccess, booksController.deleteBook);

module.exports = router;