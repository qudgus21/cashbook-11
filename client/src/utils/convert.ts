import { getDateInfo, isEmpty } from "./util-func";

function convertHistorysToHandyObject () {
    if (!isEmpty(this.state.historys)) {
        this.state.historys = this.state.historys.map((h: any) => {
            const date = new Date(h.time);
            h = { ...h, ...getDateInfo(h.time)};
            h.time = `${date.getHours()}:${date.getMinutes()}`;
            return h;
        });

        const historysObj = {};

        this.state.historys.forEach((h: any)=> {
            if (isEmpty(historysObj[`${h.year}-${h.month}-${h.date}`])) {
                historysObj[`${h.year}-${h.month}-${h.date}`] = [h];
            } else {
                historysObj[`${h.year}-${h.month}-${h.date}`].push(h);
            }
        });

        this.state.historysObj = historysObj;
    }
};

export { convertHistorysToHandyObject };