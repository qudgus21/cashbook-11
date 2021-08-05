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

        // 받아온 query를 기반으로 where 문 제작
        const where = { ...makeWhereConditionWithQuery(req.query) , UserPk: user.pk };

        // PayType 과 조인한 데이터 가져오기 
        const historys = await db.History.findAll({ 
            where,
            include: [
                { model: db.PayType, required: true, attributes: ['name']}
            ]
        });

        let { code, message } = success.DEFAULT_READ;

        // 데이터가 없다면 조금 더 커스텀 된 조회 결과를 보여주는 게 맞을 것 같다.
        if (!historys) {
            message = '조회에 성공했습니다.\n조건에 만족하는 결과가 결과가 없습니다.';
        }

        res.status(code).json({ message, historys, user: req.user });
    } catch (e) {
        next(e); 
    }
}


const createHistory = async (req, res, next) => {
    let transaction = null;

    try {
        transaction = await db.sequelize.transaction();
	
        const user = req.user;
        const UserPk = user.pk;
        let { time, CategoryPk, status, payType, content, value } = req.body;
        
	time += ' 01:00:00';

        // payType 으로 입력받은 값을 name으로 가지는 payType 이 있는지 조회
        const payTypeInDB = await db.PayType.findOne({where: { name: payType }});
        
        
        let PayTypePk;
        if (!isEmptyOneResultFromDB(payTypeInDB)) {
            // 조회된 결과가 있다면
            PayTypePk = payTypeInDB.pk;
        } else {
            // 없다면 새롭게 payType 을 만든다.
            const newPayType = await db.PayType.create({ name: payType }, { transaction });

            // 만드는데 실패했다면 에러를 뱉는다.
            if (isEmptyOneResultFromDB(newPayType)) {
                throw new CustomError(error.CREATE_ERROR);
            }

            PayTypePk = newPayType.pk;
        }

        // 입력받은 value 가 0 이하이면 에러를 뱉는다.
        if (value <= 0) {
            throw new CustomError(error.INVALID_INPUT_ERROR);
        }

        // 유저의결제수단 테이블에서 'payType을 name으로 가지는 결제수단의 pk'를 가지고 조회한다.
        const userPayType = await db.UserPayType.findOne({
            where: { PayTypePk }, 
        });

        // 유저의 결제수단에 없다면
        if (isEmptyOneResultFromDB(userPayType)) {
            // 새롭게 유저의 결제수단에 추가한다.
            const newUserPayType = await db.UserPayType.create({ PayTypePk , UserPk }, { transaction });

            // 추가가 되지 않았다면 에러를 뱉는다.
            if (isEmptyOneResultFromDB(newUserPayType)) {
                throw new CustomError(error.CREATE_ERROR);
            }
        }

        // 입력받은 body 의 데이터를 가지고 history 를 만든다.
        const history = await db.History.create(
            { content, time, PayTypePk, status, value, UserPk, CategoryPk },
            { transaction },
        );
        
        // 만드는데 실패했다면 에러를 뱉는다.
        if(!history) {
            throw new CustomError(error.CREATE_ERROR);
        }

        const { year, month } = getDateInfo(time);

        // 성공적으로 히스토리를 제작했다면,
        // userPayTrend 에도 반영해주기 위해 해당 년도, 월, 유저의 pk, 카테고리 pk 를 가지고 조회한다.
        const userPayTrendInDB = await db.UserPayTrend.findOne({
            where: { year, month, UserPk, CategoryPk }
        });

        // 조회된 결과가 없다면,
        if (isEmptyOneResultFromDB(userPayTrendInDB)) {
            // 새롭게 제작하여, 방금 추가된 히스토리의 금액만큼 반영해준다.
            const newUserPayTrend = await db.UserPayTrend.create(
                { year, month, UserPk, CategoryPk, amount : value },
                { transaction },
            );
        } else {
            // 기존에 존재한다면, 기존의 amount 에 value 를 추가해준다.
            const amount = parseInt(userPayTrendInDB.amount, 10) + parseInt(value, 10);
            const [affectedRow] = await db.UserPayTrend.update({ amount }, {
                where: { pk : userPayTrendInDB.pk }, transaction
            });

            // 업데이트가 되지 않았다면 에러를 뱉는다.
            if (!affectedRow) {
                throw new CustomError(error.UPDATE_ERROR);
            }
        }
        
        // 지금까지의 작업이 성공적으로 이루어졌기 때문에, transaction 걸린 row 들을 커밋해준다.
        await transaction.commit();
        const { code, message } = success.DEFAULT_CREATE;

        res.status(code).json({ message, history: {...history, PayType: { name: payType }}, user: req.user });
    } catch (e) {
        // 에러가 발생한 내역들을 롤백해준다.
        await transaction.rollback();
        next(e); 
    }
}


const deleteHistory = async (req, res, next) => {
    let transaction = null;

    try {
        transaction = await db.sequelize.transaction();
        
        const user = req.user;
        const UserPk = user.pk;
        const pk = req.params.pk;
        
        // 삭제할 히스토리를 조회한다.
        const history = await db.History.findOne({ where: { pk } })

        // 조회된 히스토리가 없다면, 에러를 뱉는다.
        if (!history) {
            throw new CustomError(error.NO_DATA);
        }

        // 다른 유저의 히스토리를 지우려고 한다면, 에러를 뱉는다.
        if (history.UserPk != user.pk) {
            throw new CustomError(error.WRONG_ACCESS_ERROR);
        }
        
        // 삭제를 요청한다.
        const affectedRow = await db.History.destroy({where: { pk } ,  transaction });

        // 삭제된 데이터가 없는경우
        if (!affectedRow) {
            throw new CustomError(error.DELETE_ERROR);
        }

        // 성공적으로 삭제가 됐다면, UserPayTrend 에도 반영해줘야 한다.
        // 삭제된 데이터의 년, 월, UserPk, CategoryPk를 가지고 조회한다.
        const { year, month } = getDateInfo(history.time);

        const userPayTrend = await db.UserPayTrend.findOne({
            where: { year, month, UserPk, CategoryPk: history.CategoryPk }
        });

        // 조회된 결과가 없다면, 큰 문제이다.
        if (isEmptyOneResultFromDB(userPayTrend)) {
            throw new CustomError(error.IMPURE_DATA_ERROR)
        } else {
            // 기존에 존재한다면, 기존의 amount 에 value 를 뺀다.
            const amount = parseInt(userPayTrend.amount, 10) - parseInt(history.value, 10);

            // 히스토리의 값을 뺐을 때, 0 이라면, 해당 히스토리를 지워준다.
            if (amount === 0) {
                    const affectedRow = await db.UserPayTrend.destroy({
                        where: { pk : userPayTrend.pk }, transaction
                    });
                    console.log(affectedRow);
                    // 삭제가 되지 않았다면 에러를 뱉는다.
                    if (!affectedRow) {
                        throw new CustomError(error.DELETE_ERROR);
                    }
            } else if (amount > 0) {
                // 일반적인 케이스
                const [affectedRow] = await db.UserPayTrend.update({ amount }, {
                    where: { pk : userPayTrend.pk }, transaction
                });
    
                console.log(affectedRow);
                // 업데이트가 되지 않았다면 에러를 뱉는다.
                if (!affectedRow) {
                    throw new CustomError(error.UPDATE_ERROR);
                }
            } else {
                // 데이터를 삭제했을 때, 누적 합이 0 보다 작다는건 데이터가 잘못됐기 떄문이다.
                throw new CustomError(error.IMPURE_DATA_ERROR);
            }
            
        }
        // 모두 성공했다면, 커밋을 통해 transaction을 해지해준다.
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
