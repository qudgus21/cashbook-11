const isEmpty = (str) => (typeof str == 'undefined' || str == null || str== "");

const isEmptyToken = (token) => isEmpty(token);

module.exports = {
    isEmptyToken
}