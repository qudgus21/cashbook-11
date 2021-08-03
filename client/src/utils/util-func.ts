export const isEmpty = (x) => (typeof x === 'undefined' || x === null || x === '');

export const getDateInfo = (time) => {
    time = new Date(time);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const day = time.getDay();
    return { year, month, date, day };
}