'use strict';

const router = require('express').Router();
const voter = require('../controllers/voter');

router.get('/voters/', voter.all);
router.get('/voters/:voter_id', voter.show);
router.get('/voters/internal-id/:internal_id', voter.getByInternalId);
router.get('/voters/search/filters', voter.search);
router.post('/voters/electoral-key', voter.getByElectoralKey);
router.post('/voters/zone', voter.getByZone);
router.post('/voters/section', voter.getBySection);
router.post('/voters/box', voter.getByBox);
router.post('/voters/promoter', voter.getByPromoter);
router.put('/voters/attended/:voter_id', voter.attended);

/* Export module */
module.exports = router;