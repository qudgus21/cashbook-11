const db = require('../models');
const { isEmptyToken, isEmptyObj } = require('./result-checker');
const Op = db.Sequelize.Op;

const makeWhereQueryWithDate = (startDate, endDate) => {
    let where = {};

    if (startDate && endDate) {
        endDate = new Date(endDate);
        endDate.setDate(endDate.getDate() + 1);
    
        where.time = {
            [Op.between]: [new Date(startDate), new Date(endDate)],
        };
    } else if (startDate) {
        where.time = {
            [Op.gte]: new Date(startDate),
        };
    } else if (endDate) {
        endDate = new Date(endDate);
        endDate.setDate(endDate.getDate() + 1);
        
        where.time = {
            [Op.lte]: new Date(endDate),
        };
    }
    return where;
}

const makeWhereQueryWithObj = (obj) => {
    if (isEmptyObj(obj)) {
        return {};
    } 

    Object.keys(obj).forEach(key => {
        if (isEmptyToken(obj[key])) delete obj[key];
    });

    return obj;
}

const makeWhereQueryWithStringContain = (str) => {
    let where = {};
    if (str) {
        where.content = {
            [Op.like]: `%${str}%`
        };
    }
    return where;
}

const makeWhereQueryWithRange = (minimum, maximum) => {
    let where = {};

    if (minimum && maximum) {
        where.value = {
            [Op.between]: [minimum, maximum],
        };
    } else if (minimum) {
        where.value = {
            [Op.gte]: minimum,
        }
    } else if (maximum) {
        where.value = {
            [Op.lte]: maximum,
        }
    }
    return where;
}

module.exports = {
    makeWhereQueryWithDate,
    makeWhereQueryWithObj,
    makeWhereQueryWithStringContain,
    makeWhereQueryWithRange,
};