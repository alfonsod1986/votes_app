'use strict';

const router = require('express').Router();
const user = require('../controllers/user');

router.get('/users/', user.all);
router.post('/login', user.logIn);
router.post('/testing', user.test);

/* Export module */
module.exports = router;