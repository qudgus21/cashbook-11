module.exports = (req, res, next) => {
    console.dir('ip : ', req.ip);
    console.dir(`url : [${req.method}] `, req.originalUrl);
    console.dir('params : ', req.params);
    console.dir('query : ', req.query);
    console.dir('body :', req.body);
    next();
};
