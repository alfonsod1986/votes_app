'use strict';

const router = require('express').Router();
const section = require('../controllers/section');

router.get('/sections/', section.all);
router.get('/sections/:section_id', section.show);

/* Export module */
module.exports = router;