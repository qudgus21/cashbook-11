const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const error = require('../constants/error');
const CustomError = require('../errors/custom-error');
const db = require('../models');

dotenv.config();

const jwtOptions = {
	algorithm: 'HS256',
	expiresIn: '30m',
	issuer: 'deal6',
};

/**
 * @param {object} user - DB 에서 조회한 결과
 * @param {string} user.id - user의 id
 * @param {string} user.pk - user의 pk
 * @returns {string} JWT 입니다.
 */
const createJWT = (user) => {
	const payload = {
		pk: user.pk,
		id: user.id,
	};
	return jwt.sign(payload, process.env.JWT_KEY, jwtOptions);
};

const verifyJWT = async (token) => {
	const decodeToken = jwt.verify(token, process.env.JWT_KEY);

	if (!decodeToken) {
		throw new CustomError(error.JWT_TOKEN_INVALID_ERROR);
	}

	const user = await db.User.findOne(decodeToken.id);

	if (!user || isInvalidPayLoad(decodeToken, user)) {
		throw new CustomError(error.JWT_TOKEN_INVALID_ERROR);
	}

	return user;
};

const isInvalidPayLoad = (decodeToken, user) => {
	return decodeToken.id !== user.id || decodeToken.pk !== user.pk;
};

module.exports = { createJWT, verifyJWT };