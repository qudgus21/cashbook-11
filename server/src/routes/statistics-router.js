const express = require('express');
const { userPayTrend } = require('../services/user-pay-trend-service');
const { getAllCategory } = require('../services/category-service');
const decodeJWT = require('../middlewares/decode-jwt');
const router = express.Router();

router.get('/paytrend', decodeJWT, userPayTrend);

module.exports = router;