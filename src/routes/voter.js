'use strict';

const router = require('express').Router();
const voter = require('../controllers/voter');

router.get('/voters/', voter.all);
router.get('/voters/:voter_id', voter.show);
router.get('/voters/internal-id/:internal_id', voter.getByInternalId);
router.post('/voters/electoral-key', voter.getByElectoralKey);


/* Export module */
module.exports = router;