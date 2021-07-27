const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routes');

const app = express();

dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Cashbook 11 server start!');
});

app.listen(3000, () => {
    console.log('아무말 3000 포트');
})