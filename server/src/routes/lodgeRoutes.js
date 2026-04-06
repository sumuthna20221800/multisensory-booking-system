const express = require('express');
const router = express.Router();
const { getLodges, createLodge } = require('../controllers/lodgeController');

router.get('/', getLodges);
router.post('/', createLodge);

module.exports = router;
