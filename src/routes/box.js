'use strict';

const router = require('express').Router();
const box = require('../controllers/box');

router.get('/boxes/', box.all);
router.get('/boxes/:box_id', box.show);

/* Export module */
module.exports = router;