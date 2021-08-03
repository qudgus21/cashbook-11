module.exports = {
	TEST_ERROR: {
		code: 400,
		errorMessage: '테스트 하는중입니다.',
		serverMessage: 'Just for test',
	},

	SAMPLE_ERROR: {
		code: 400,
		errorMessage: '클라이언트에 전달한 메세지입니다.',
		serverMessage: '서버에 표시할 로그입니다.',
	},

	INVALID_INPUT_ERROR: {
		code: 400,
		errorMessage: '잘못된 입력이 있습니다.',
		serverMessage: 'Invalid input request error',
	},

	NO_DATA: {
		code: 400,
		errorMessage: '조회된 데이터가 없습니다.',
		serverMessage: 'No such data error',
	},

	LOGIN_ERROR: {
		code: 400,
		errorMessage: '해당 아이디가 존재하지 않습니다.',
		serverMessage: 'No such user error',
	},

	WRONG_PASSWORD_ERROR: {
		code: 400,
		errorMessage: '비밀번호가 틀렸습니다.',
		serverMessage: 'Wrong password',
	},

	JWT_TOKEN_INVALID_ERROR: {
		code: 401,
		errorMessage: '검증되지 않은 token 입니다.',
		serverMessage: 'Wrong JWT token access error',
	},

	EXIST_USER_ID_ERROR: {
		code: 400,
		errorMessage: '이미 존재하는 ID 입니다.',
		serverMessage: 'Already exist ID',
	},

	CREATE_ERROR: {
		code: 400,
		errorMessage: '비정상적으로 생성이 취소되었습니다.',
		serverMessage: 'DB Create SQL query error',
	},

	NO_PRODUCT_ERROR: {
		code: 400,
		errorMessage: '요청한 물건이 없습니다.',
		serverMessage: 'There is no product have such pk',
	},

	UPDATE_ERROR: {
		code: 400,
		errorMessage: '업데이트에 실패 했습니다.',
		serverMessage: 'Update Fail',
	},

	DELETE_ERROR: {
		code: 400,
		errorMessage: '삭제에 실패 했습니다.',
		serverMessage: 'Delete Fail',
	},

	WRONG_ACCESS_ERROR: {
		code: 401,
		errorMessage: '잘못된 접근입니다.',
		serverMessage: 'Wrong access',
	},

	IMPURE_DATA_ERROR: {
		code:400,
		errorMessage: '저장된 데이터에 오류가 있습니다!\n관리자에게 문의하세요.',
		serverMessage: 'Critical Error. Insane, Impure Data!!!!',
	}
};
