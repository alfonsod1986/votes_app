'use strict';

const router = require('express').Router();
const user = require('../controllers/user');

router.get('/users/', user.all);
router.put('/users/update/:user_id', user.update);
router.post('/login', user.logIn);
router.post('/register', user.save);
router.post('/testing', user.test);

/* Export module */
module.exports = router;