const db = require('../models');
const success = require('../constants/success');
const error = require('../constants/error');
const CustomError = require('../errors/custom-error');

const userPayTrend = async (req, res, next) => {
    try {
        const UserPk = req.user.pk
        const month = req.query.month;
        const year = req.query.year;

        const payTrends = await db.UserPayTrend.findAll({ 
            where: {
                UserPk,
                year,
                month
            },
            include: [
                { model: db.Category, attributes: ["name"] },
            ]
         });


        if (!payTrends) {
            throw new CustomError(error.NO_DATA);
        }


        const { code, message } = success.DEFAULT_READ;

        res.status(code).json({ message, payTrends });
    } catch (e) {
        next(e); 
    }
}

module.exports = {
    userPayTrend
};