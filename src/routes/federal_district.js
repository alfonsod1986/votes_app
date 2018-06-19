'use strict';

const router = require('express').Router();
const federal_district = require('../controllers/federal_district');

router.get('/federal-districts/', federal_district.all);
router.get('/federal-districts/:federal_district_id', federal_district.show);

/* Export module */
module.exports = router;