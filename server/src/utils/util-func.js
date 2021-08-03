const getDateInfo = (time) => {
    time = new Date(time);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const day = time.getDay();
    return { year, month, date, day };
}

module.exports = {
    getDateInfo,
}