const db = require('../models');
const success = require('../constants/success');
const error = require('../constants/error');
const CustomError = require('../errors/custom-error');
const { makeWhereQueryWithDate, makeWhereQueryWithObj, makeWhereQueryWithStringContain, makeWhereQueryWithRange } = require('../utils/make-query');
const { isEmptyToken, isEmptyOneResultFromDB } = require('../utils/result-checker');
const { getDateInfo } = require('../utils/util-func');

const Op = db.Sequelize.Op;

const getAllHistoryByFilter = async (req, res, next) => {
    try {
        const user = req.user;

        const where = { ...makeWhereConditionWithQuery(req.query) , UserPk: user.pk };

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
        const UserPk = user.pk;
        const { time, CategoryPk, status, payType, content, value } = req.body;
        
        const payTypeInDB = await db.PayType.findOne({where: { name: payType }});
        
        let PayTypePk;
        if (!isEmptyOneResultFromDB(payTypeInDB)) {
            PayTypePk = payTypeInDB.pk;
        } else {
            const newPayType = await db.PayType.create({ name: payType }, { transaction });

            if (isEmptyOneResultFromDB(newPayType)) {
                throw new CustomError(error.CREATE_ERROR);
            }

            PayTypePk = newPayType.pk;
        }

        if (value < 0) {
            throw new CustomError(error.INVALID_INPUT_ERROR);
        }

        /*
            userPayType 에 있는지 확인하고 추가해야 합니다.
            userPayTrend 를 추가 혹은 업데이트 해야 합니다.
        */

        const userPayType = await db.UserPayType.findOne({
            where: { PayTypePk }, 
        });

        if (isEmptyOneResultFromDB(userPayType)) {
            const newUserPayType = await db.UserPayType.create({ PayTypePk , UserPk }, { transaction });

            if (isEmptyOneResultFromDB(newUserPayType)) {
                throw new CustomError(error.CREATE_ERROR);
            }
        }

        const history = await db.History.create(
            { content, time, PayTypePk, status, value, UserPk, CategoryPk },
            { transaction },
        );
        
        if(!history) {
            throw new CustomError(error.CREATE_ERROR);
        }

        const { year, month } = getDateInfo(time);

        const userPayTrendInDB = await db.UserPayTrend.findOne({
            where: { year, month, UserPk, CategoryPk }
        });

        if (isEmptyOneResultFromDB(userPayTrendInDB)) {
            //create
            const newUserPayTrend = await db.UserPayTrend.create(
                { year, month, UserPk, CategoryPk, amount : value },
                { transaction },
            );
        } else {
            //update
            const amount = parseInt(userPayTrendInDB.amount, 10) + parseInt(value, 10);
            const [affectedRow] = await db.UserPayTrend.update({ amount }, {
                where: { pk : userPayTrendInDB.pk }, transaction
            });

            if (!affectedRow) {
                throw new CustomError(error.UPDATE_ERROR);
            }
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
    where = { ...where, ...makeWhereQueryWithObj({CategoryPk, PayTypePk}) };
    where = { ...where, ...makeWhereQueryWithStringContain(content) };
    where = { ...where, ...makeWhereQueryWithRange(minimumValue, maximumValue) };

    return where;
}



module.exports = {getAllHistoryByFilter, getAllHistory, createHistory, deleteHistory };