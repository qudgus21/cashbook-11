const CustomError = require('../errors/custom-error');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
	if (err instanceof CustomError) {
		console.log(`[CUSTOM ERROR] : ${err.serverMessage}`);
		return res.status(err.code).json({ message: err.message });
	} else {
		console.log(`[ERROR] : Unknown error : ${err}`);
		return res.status(500).json({ message: 'unknown error!' });
	}
};
