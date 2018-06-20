'use strict';

const router = require('express').Router();
const box_ubication = require('../controllers/box_ubication');

router.get('/box-ubications/', box_ubication.all);
router.get('/box-ubications/:box_ubication_id', box_ubication.show);

/* Export module */
module.exports = router;