module.exports = (req, res, next) => {
    console.log('----------------------------------------');
    console.log('time: ', new Date());
    console.log('ip : ', req.ip);
    console.log(`url : [${req.method}] `, req.originalUrl);
    console.log('params : ', req.params);
    console.log('body : ',  req.body);
    console.log('query : ', req.query);
    console.log('----------------------------------------');
    next();
};
