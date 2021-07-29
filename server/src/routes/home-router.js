const express = require('express');
const { getHistory } = require('../services/history-service');
const decodeJWT = require('../middlewares/decode-jwt');
const router = express.Router();

router.post('/history', decodeJWT, getHistory);


module.exports = router;