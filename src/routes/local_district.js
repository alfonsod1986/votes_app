'use strict';

const router = require('express').Router();
const local_district = require('../controllers/local_district');

router.get('/local-districts/', local_district.all);
router.get('/local-districts/:local_district_id', local_district.show);

/* Export module */
module.exports = router;