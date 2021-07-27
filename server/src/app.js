const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Cashbook 11 server start!');
});

app.listen(3000, () => {
    console.log('아무말 3000 포트');
})