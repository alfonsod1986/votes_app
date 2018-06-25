'use strict';

const router = require('express').Router();
const statistic = require('../controllers/statistic');

router.get('/statistics/sections', statistic.sectionStatistics);

/* Export module */
module.exports = router;