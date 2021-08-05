module.exports = (req, res, next) => {
    console.log('ip : ', req.ip);
    console.log(`url : [${req.method}] `, req.originalUrl);
    console.log('params : ', req.params);
    console.log('body : ',  req.body);
    console.log('query : ', req.query);
    console.dir(req.ip);
    console.dir(req.originalUrl);
    console.dir(req.params);
    console.dir(req.query);
    console.dir(req.body);
    next();
};
