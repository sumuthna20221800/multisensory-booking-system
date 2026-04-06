const express = require('express');
const router = express.Router();
const { getMailHealth } = require('../controllers/mailController');

router.get('/health', getMailHealth);

module.exports = router;
