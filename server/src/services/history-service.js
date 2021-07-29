const db = require('../models');
const success = require('../constants/success');
const error = require('../constants/error');
const CustomError = require('../errors/custom-error');

const Op = db.Sequelize.Op;

const getAllHistoryByFilter = async (req, res, next) => {
    try {

        let { 
            startDate,      // '2021-05-20'
            endDate,        // '2021-08-20'
            CategoryPk,     // '2'
            content,        // '씨유한양대'
            PayTypePk,      // '1'
            minimumPrice,   // '10000'
            maximumPrice    // '130000'
        } = req.query;

        const where = {};

        if (startDate && endDate) {
            where.time = {
                [Op.between]: [new Date(startDate), new Date(endDate)], // 추후 다음날 오전 12시로 처리해야한다. 
            };
        } else if (startDate) {
            where.value = {
                [Op.gte]: new Date(startDate),
            }
        } else if (endDate) {
            where.value = {
                [Op.lte]: new Date(endDate),
            }
        }

        if (CategoryPk) {
            where.CategoryPk = CategoryPk;
        }

        if (PayTypePk) {
            where.PayTypePk = PayTypePk;
        }

        if (content) {
            where.content = {
                [Op.like]: `%${content}%`
            };
        }

        if (minimumPrice && maximumPrice) {
            where.value = {
                [Op.between]: [minimumPrice, maximumPrice],
            };
        } else if (minimumPrice) {
            where.value = {
                [Op.gte]: minimumPrice,
            }
        } else if (maximumPrice) {
            where.value = {
                [Op.lte]: maximumPrice,
            }
        }

        const historys = await db.History.findAll({ where });

        if (!historys) {
            throw new CustomError(error.NO_DATA);
        }

        const { code, message } = success.DEFAULT_READ;

        res.status(code).json({ message, historys, user: req.user });
    } catch (e) {
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


module.exports = {getAllHistoryByFilter, getAllHistory};