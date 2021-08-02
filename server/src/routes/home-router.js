const express = require('express');
const { getAllHistoryByFilter, getAllHistory, createHistory, deleteHistory } = require('../services/history-service');
const decodeJWT = require('../middlewares/decode-jwt');
const { getAllUserPayType } = require('../services/user-pay-type-service');
const { getAllCategory } = require('../services/category-service');
const router = express.Router();

router.get('/history/all', decodeJWT, getAllHistoryByFilter);

router.get('/history/all-no-filter', decodeJWT, getAllHistory);

router.get('/category', decodeJWT, getAllCategory);

router.get('/user-pay-type', decodeJWT, getAllUserPayType);

router.post('/history', decodeJWT, createHistory);

router.delete('/history/:pk', decodeJWT, deleteHistory);

module.exports = router;