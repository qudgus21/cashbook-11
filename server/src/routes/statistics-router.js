const express = require('express');
const { userPayTrend ,categoryPayTrend} = require('../services/user-pay-trend-service');
const { getAllCategory } = require('../services/category-service');
const decodeJWT = require('../middlewares/decode-jwt');
const router = express.Router();

router.get('/paytrend', decodeJWT, userPayTrend);

router.get('/category-paytrend', decodeJWT, categoryPayTrend);


module.exports = router;