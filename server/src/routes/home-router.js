const express = require('express');
const { getAllHistoryByFilter, getAllHistory } = require('../services/history-service');
const decodeJWT = require('../middlewares/decode-jwt');
const router = express.Router();

router.get('/history/all', decodeJWT, getAllHistoryByFilter);

router.get('/history/all-no-filter', decodeJWT, getAllHistory);


module.exports = router;