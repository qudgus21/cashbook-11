const db = require('../models');
const success = require('../constants/success');
const error = require('../constants/error');
const CustomError = require('../errors/custom-error');
const { createHash, verifyPassword } = require('../utils/bcrypt');

const signIn = async (req, res, next) => {

}

const signUp = async (req, res, next) => {
    try {
        const { id, password } = req.body;

        const [user, isCreated] = await db.User.findOrCreate({
            where: { id },
            defaults: { password: createHash(password) }
        });
    
        if (!isCreated) {
            throw new CustomError(error.EXIST_USER_ID_ERROR);
        }

        const { code, message } = success.DEFAULT_CREATE;

        res.status(code).json({ message, user });
    } catch (e) {
        next(e); 
    }
}

const logout = async (req, res, next) => {

}

const updateUserInfo = async (req, res, next) => {

}


module.exports = {signIn, signUp, logout, updateUserInfo};