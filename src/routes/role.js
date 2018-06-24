'use strict';

const router = require('express').Router();
const role = require('../controllers/role');

router.get('/roles/', role.all);
router.get('/roles/:role_id', role.show);

/* Export module */
module.exports = router;