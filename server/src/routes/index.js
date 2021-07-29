const express = require('express');

const userRouter = require('./user-router');
const homeRouter = require('./home-router');

const router = express.Router();

router.use('/user', userRouter);
router.use('/home', homeRouter);

module.exports = router;
