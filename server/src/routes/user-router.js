const express = require('express');
const { signIn, signUp, updateUserInfo, logout ,getMyUserInfo} = require('../services/user-service');
const decodeJWT = require('../middlewares/decode-jwt');
const router = express.Router();

router.post('/signin', signIn);

router.post('/signup', signUp);

router.post('/logout', decodeJWT, logout);

router.get('/update/:pk',  decodeJWT, updateUserInfo);

router.get('/getMyUserInfo', decodeJWT, getMyUserInfo);
module.exports = router;