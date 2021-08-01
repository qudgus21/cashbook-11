const db = require('../models');
const success = require('../constants/success');
const error = require('../constants/error');
const CustomError = require('../errors/custom-error');
const { createHash, verifyPassword } = require('../utils/bcrypt');
const { createJWT } = require('../utils/jwt');

const signIn = async (req, res, next) => {
    try {
        const { id, password } = req.body;

        const user = await db.User.findOne({
            where: { id },
        });
    
        if (!user) {
            throw new CustomError(error.LOGIN_ERROR);
        }
        
        if (!verifyPassword({hash: user.password, password})) {
            throw new CustomError(error.WRONG_PASSWORD_ERROR);
        }

        const JWT = createJWT(user);

        res.cookie('JWT', JWT);

        const { code, message } = success.LOGIN;
        
        user.password = '';

        res.status(code).json({ message, user, JWT });
    } catch (e) {
        next(e); 
    }
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
    try {
		res.clearCookie('JWT');

		const { code, message } = success.LOGOUT;

		res.status(code).json({ message });
	} catch (err) {
		next(err);
	}
}

const updateUserInfo = async (req, res, next) => {
    console.log(req.user)
    // res.status(200).json({ message: '아직 구현안됐어용~~' });
}

// decodeJWT 다음에 넣으면 된다.
const getMyUserInfo = async (req, res, next) => {
	try {
		const user = req.user;

		const { code, message } = success.DEFAULT_READ;

		res.status(code).json({ user, message });
	} catch (err) {
		next(err);
	}
};


module.exports = {
    signIn, 
    signUp, 
    logout, 
    updateUserInfo, 
    getMyUserInfo
};