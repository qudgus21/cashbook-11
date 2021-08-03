const isEmpty = (str) => (typeof str == 'undefined' || str == null || str== "");

const isEmptyToken = (token) => isEmpty(token);

const isEmptyObj = (obj) => {
    return isEmpty(obj) || obj === {} || obj == {};
}

const isEmptyOneResultFromDB = (response) => isEmptyObj(response);

module.exports = {
    isEmptyToken,
    isEmptyObj,
    isEmptyOneResultFromDB,
}