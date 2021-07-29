const db = require('../models');
const success = require('../constants/success');
const error = require('../constants/error');
const CustomError = require('../errors/custom-error');

const getAllCategory = async (req, res, next) => {
    try {
        const user = req.user;
        const categorys = await db.Category.findAll();
        
        if (!categorys) {
            throw new CustomError(error.NO_DATA);
        }

        const { code, message } = success.DEFAULT_READ;

        res.status(code).json({ message, user, categorys });
    } catch (e) {
        next(e); 
    }
}

module.exports = {
    getAllCategory
};