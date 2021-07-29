import Observable from "../core/observable";
import api from "../utils/api";
import { getDates } from "../utils/date";

export default class DateStore extends Observable {
    state: { year: number; month: number; historys: any; };

    constructor(time) {
        super();
        this.state = {
            year: time.getFullYear(),
            month: time.getMonth() + 1,
            historys: null,
        };
    }

    setState(nextState: { year: number; month: number; historys: any;}) {
        this.state = nextState;
        this.notify(this.state);
    }


    async getAllHistory(year: number, month: number) {
        let dates = getDates(year , month)
        let startDate:any = 1;
        let endDate:any;
        let notCurrent = true;
        dates.forEach((date, i) => {
            if (!notCurrent) { 
                endDate = date;
            }
            if (notCurrent && date === 1) {
                notCurrent = false;
            } else if(!notCurrent && date === 1){ 
                endDate = dates[i-1]
                notCurrent = true;
            }
        })
        startDate = `${year}-${month}-${startDate}`
        endDate = `${year}-${month}-${endDate}`

        const response = await api('GET', `/calendar/history/all?startDate=${startDate}&endDate=${endDate}`)
        
        if (response.isFail) {
            alert(response.message);
        } else { 
            return response.historys
        }
    }


    async moveToPreviousMonth() {
        console.log('실행')

        let { year, month } = this.state;
        if (this.state.month === 1) {
            year--;
            month = 12;
        }
        else {
            month--;
        }

        let historys = await this.getAllHistory(year, month)
        
        this.setState({ year, month, historys });
    }

    async moveToNextMonth() {
        let { year, month } = this.state;

        if (this.state.month === 12) {
            year++;
            month = 1;
        }
        else {
            month++;
        }

        let historys = await this.getAllHistory(year, month)
        this.setState({ year, month, historys });
    }
}