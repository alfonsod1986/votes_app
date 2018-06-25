'use strict';

const router = require('express').Router();
const statistic = require('../controllers/statistic');

router.get('/statistics/sections', statistic.sectionsStatistics);
router.get('/statistics/boxes', statistic.boxesStatistics);
router.get('/statistics/zones', statistic.zonesStatistics);

/* Export module */
module.exports = router;