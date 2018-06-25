'use strict';

const router = require('express').Router();
const statistic = require('../controllers/statistic');

router.get('/statistics/sections', statistic.sectionsStatistics);
router.get('/statistics/boxes', statistic.boxesStatistics);

/* Export module */
module.exports = router;