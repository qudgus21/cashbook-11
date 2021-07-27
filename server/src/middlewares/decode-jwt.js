const error = require('../constants/error');
const CustomError = require('../errors/custom-error');
const { verifyJWT } = require('../utils/jwt');

module.exports = async (req, res, next) => {
	console.log('decodeJWT Middleware called');
	/**
	 * JWT Token 을 decode 를 통해 유저를 식별한다.
	 */
	const token = req.cookies.JWT;

	if (token) {
		try {
			const user = await verifyJWT(token);

			req.user = user;
			next();
		} catch (err) {
			console.log('err jwt');
			next(err);
		}
	} else {
		next(new CustomError(error.JWT_TOKEN_INVALID_ERROR));
	}
};
