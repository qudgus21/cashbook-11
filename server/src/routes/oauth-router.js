const express = require('express');
const {githubCallback} = require('../services/oauth-service');
const router = express.Router();



router.get('/callback', githubCallback);

module.exports = router;