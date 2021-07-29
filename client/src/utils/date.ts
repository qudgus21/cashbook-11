export const getDates = (year, month) => { 
    const viewYear = year;
    const viewMonth = month;
    const prevLast = new Date(viewYear, viewMonth-1, 0);
    const thisLast = new Date(viewYear, viewMonth, 0);
    const pldate = prevLast.getDate();
    const plday = prevLast.getDay();
    const tldate = thisLast.getDate();
    const tlday = thisLast.getDay();
    const thisDates = []; const prevDates = []; const nextDates = [];
    const days = Array(tldate+1).keys()
    while(true) {
        let iteratorResult = days.next();
        if ( iteratorResult.done === true ) break;
        thisDates.push(iteratorResult.value);
      }
    if (plday !== 6) {
        for (let i = 0; i < plday + 1; i++) {
          prevDates.unshift(pldate - i);
        }
    }
    for (let i = 1; i < 7 - tlday; i++) {nextDates.push(i);}
    const dates = prevDates.concat(thisDates.slice(1), nextDates);
    return dates
}