const express = require('express');
const router = express.Router();
module.exports = router;

// GET /ping - Check service health
router.get('/ping', (req, res) => res.send('OK'));
