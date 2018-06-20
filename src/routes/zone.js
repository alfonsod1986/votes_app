'use strict';

const router = require('express').Router();
const zone = require('../controllers/zone');

router.get('/zones/', zone.all);
router.get('/zones/:zone_id', zone.show);

/* Export module */
module.exports = router;