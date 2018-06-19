'use strict';

const router = require('express').Router();
const occupation = require('../controllers/occupation');

router.get('/occupations/', occupation.all);
router.get('/occupations/:occupation_id', occupation.show);

/* Export module */
module.exports = router;