const express = require('express');
const { signIn, signUp, updateUserInfo, logout } = require('../services/user-service');
const decodeJWT = require('../middlewares/decode-jwt');
const router = express.Router();

router.post('/signin', signIn);

router.post('/signup', signUp);

router.post('/logout', decodeJWT, logout);

router.put('/update/:pk', decodeJWT, updateUserInfo);

module.exports = router;