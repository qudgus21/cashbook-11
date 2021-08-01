const express = require('express');

const userRouter = require('./user-router');
const homeRouter = require('./home-router');
const calendarRouter = require('./calendar-router');
const statisticsRouter= require('./statistics-router');

const router = express.Router();

router.use('/user', userRouter);
router.use('/home', homeRouter);
router.use('/calendar', calendarRouter);
router.use('/statistics', statisticsRouter);

module.exports = router;
