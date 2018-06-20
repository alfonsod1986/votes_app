'use strict';

const router = require('express').Router();
const section_type = require('../controllers/section_type');

router.get('/section-types/', section_type.all);
router.get('/section-types/:section_type_id', section_type.show);

/* Export module */
module.exports = router;