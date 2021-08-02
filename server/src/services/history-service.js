const db = require('../models');
const success = require('../constants/success');
const error = require('../constants/error');
const CustomError = require('../errors/custom-error');
const { makeWhereQueryWithDate, makeWhereQueryWithObj, makeWhereQueryWithStringContain, makeWhereQueryWithRange } = require('../utils/make-query');
const { isEmptyToken } = require('../utils/result-checker');

const Op = db.Sequelize.Op;

const getAllHistoryByFilter = async (req, res, next) => {
    try {
        const user = req.user;

        const where = { ...makeWhereConditionWithQuery(req.query) };
        where.UserPk = user.pk;

        const historys = await db.History.findAll({ 
            where,
            include: [
                { model: db.PayType, required: true, attributes: ['name']}
            ]
        });

        if (!historys) {
            throw new CustomError(error.NO_DATA);
        }

        const { code, message } = success.DEFAULT_READ;

        res.status(code).json({ message, historys, user: req.user });
    } catch (e) {
        next(e); 
    }
}


const createHistory = async (req, res, next) => {
    let transaction = null;

    try {
        transaction = await db.sequelize.transaction();
0
        const user = req.user;
        const { time, CategoryPk, status, payType, content, value } = req.body;
        /* 만들때, 필요한거
            시간을 time + ' 00:00:00' 을 해주거나
            payType 으로 입력받은 것을 조회해서 없으면 만들고 있으면 pk 값을 가져와서 PayTypePk 로 둔다.
            value 가 0 혹은 양수인지 체크
        */
        if (value < 0) {
            throw new CustomError(error.INVALID_INPUT_ERROR);
        }
        const [{ pk }, _] = await db.PayType.findOrCreate({
            where: { name: payType }
        });

        if (isEmptyToken(pk)) {
            throw new CustomError(error.NO_DATA);
        }

        const PayTypePk = pk;
        
        const history = await db.History.create({ content, time, PayTypePk, status, value, UserPk: user.pk, CategoryPk });
        if(!history) {
            throw new CustomError(error.CREATE_ERROR);
        }
        await transaction.commit();
        const { code, message } = success.DEFAULT_CREATE;

        res.status(code).json({ message, history: {...history, PayType: { name: payType }}, user: req.user });
    } catch (e) {
        await transaction.rollback();
        next(e); 
    }
}


const deleteHistory = async (req, res, next) => {
    let transaction = null;

    try {
        transaction = await db.sequelize.transaction();
        
        const user = req.user;
        const pk = req.params.pk;
        console.log(pk);
        const history = await db.History.findOne({ where: { pk } })

        if (!history) {
            throw new CustomError(error.NO_DATA);
        }

        if (history.UserPk != user.pk) {
            throw new CustomError(error.WRONG_ACCESS_ERROR);
        }
        
        const affectedRow = await db.History.destroy({where: { pk }});

        if (!affectedRow) {
            throw new CustomError(error.DELETE_ERROR);
        }

        transaction.commit();

        const { code, message } = success.DEFAULT_DELETE;

        res.status(code).json({ message, history, user: req.user });
    } catch (e) {
        transaction.rollback();
        next(e); 
    }
}


const getAllHistory = async (req, res, next) => {
    try {

        const historys = await db.History.findAll();

        if (!historys) {
            throw new CustomError(error.NO_DATA);
        }

        const { code, message } = success.DEFAULT_READ;

        res.status(code).json({ message, historys, user: req.user });
    } catch (e) {
        next(e); 
    }
}

const makeWhereConditionWithQuery = (query) => {
    let where = {};
    let { 
        startDate,      // '2021-05-20'
        endDate,        // '2021-08-20'
        CategoryPk,     // '2'
        content,        // '씨유한양대'
        PayTypePk,      // '1'
        minimumValue,   // '10000'
        maximumValue    // '130000'
    } = query;

    where = { ...where, ...makeWhereQueryWithDate(startDate, endDate) };
    where = { ...where, ...makeWhereQueryWithObj({CategoryPk}) };
    where = { ...where, ...makeWhereQueryWithObj({PayTypePk}) };
    where = { ...where, ...makeWhereQueryWithStringContain(content) };
    where = { ...where, ...makeWhereQueryWithRange(minimumValue, maximumValue) };

    return where;
}



module.exports = {getAllHistoryByFilter, getAllHistory, createHistory, deleteHistory };