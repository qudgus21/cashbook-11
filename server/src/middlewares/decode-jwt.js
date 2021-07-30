const error = require('../constants/error');
const CustomError = require('../errors/custom-error');
const { verifyJWT } = require('../utils/jwt');

module.exports = async (req, res, next) => {
	console.log('decodeJWT Middleware called');

	const token = req.headers.authorization.split(' ')[1]

	if (token != undefined) {
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
