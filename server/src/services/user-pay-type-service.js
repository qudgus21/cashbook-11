const db = require('../models');
const success = require('../constants/success');
const error = require('../constants/error');
const CustomError = require('../errors/custom-error');

const getAllUserPayType = async (req, res, next) => {
    try {
        const user = req.user;
        const UserPk = user.pk;

        const userPayTypesByUserPk = await db.UserPayType.findAll({
            where: { UserPk },
        });    

        const userPayTypes = [];
        for (let i = 0; i < userPayTypesByUserPk.length; i++) {
            let userPayType = await db.PayType.findOne({
                where: { 
                    pk: userPayTypesByUserPk[i].PayTypePk 
                } 
            });
            
            if (!userPayType) {
                throw new CustomError(error.NO_DATA);
            }
            
            userPayType.dataValues.UserPayTypePk = userPayTypesByUserPk[i].pk;
            userPayTypes.push(userPayType);
        }
        
        const { code, message } = success.DEFAULT_READ;

        res.status(code).json({ message, user, userPayTypes });
    } catch (e) {
        next(e); 
    }
}

module.exports = {
    getAllUserPayType
};