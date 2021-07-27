class CustomError extends Error {
	constructor(error) {
		super(error.errorMessage);
		this.code = error.code;
		this.serverMessage = error.serverMessage;
	}
}

module.exports = CustomError;
