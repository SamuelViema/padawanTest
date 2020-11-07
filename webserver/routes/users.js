let express = require('express');
let usersController = require('../controllers/users');

let router = express.Router();

/* Test Routes */

router.get('/test', usersController.test);

/* Use Routes */

router.post('/register', usersController.insertUser);

router.post('/login', usersController.logIn);

module.exports = router;