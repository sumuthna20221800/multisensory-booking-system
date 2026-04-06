const express = require('express');
const { sendTestMail } = require('../controllers/mailController');

const router = express.Router();

router.post('/test', sendTestMail);

module.exports = router;
