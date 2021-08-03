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



const categoryPayTrend = async (req, res, next) => {
    try {
        const UserPk = req.user.pk
        const month = req.query.month;
        const year = req.query.year;
        const category = req.query.category;

        const payTrends = await db.UserPayTrend.findAll({
            where: {
                UserPk,
                year,
                '$Category.name$':  category
            },
            include: [
                { model: db.Category , attributes: ["name"] },
            ]
        });
        
        let sorted = payTrends.filter((item => { 
            return item.month <= month;
        }))

        sorted = sorted.sort((a, b) => { 
            return a.month - b.month
        })

        if (!payTrends) {
            throw new CustomError(error.NO_DATA);
        }

        const { code, message } = success.DEFAULT_READ;

        res.status(code).json({ message, payTrends : sorted});
    } catch (e) {
        next(e); 
    }
}

module.exports = {
    userPayTrend,categoryPayTrend
};