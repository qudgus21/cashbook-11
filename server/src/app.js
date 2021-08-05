const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routes');
const db = require('./models');
const errorHandler = require('./middlewares/error-handler');
const log = require('./middlewares/log');
const app = express();

const isForced = false;

db.sequelize.sync({force: isForced}).then(()=> {
    if (process.env.NODE_ENV === 'test') return;

    console.log('DB is connected successfully and forced', isForced);
    console.log('==================================');
}).catch(e => {
    console.error('DB connection error',e);
});

dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(log);

app.use('/api', router);

app.use(errorHandler);

const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`병영생활 화이팅~! ${port} 포트 개방`);
})
