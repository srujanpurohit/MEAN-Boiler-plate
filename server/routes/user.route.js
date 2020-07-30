const express = require('express');
const router = express.Router();
module.exports = router;


router.get('/me', (req, res) => {
  res.send(req.user); // for more details fetch user from DB
});
