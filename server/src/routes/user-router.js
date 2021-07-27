const express = require('express');

const router = express.Router();

router.get('/signin', (req, res) => {
    res.send('Login success');
});

module.exports = router;