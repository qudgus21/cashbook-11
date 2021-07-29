const express = require('express');
const { getAllHistoryByFilter, getAllHistory } = require('../services/history-service');
const decodeJWT = require('../middlewares/decode-jwt');
const router = express.Router();

router.get('/history/all', decodeJWT, getAllHistoryByFilter);



module.exports = router;