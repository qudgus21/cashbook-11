import Observable from "../core/observable";
import api from "../utils/api";
import { getDates } from "../utils/date";
import { checkLogin } from "../utils/cookie";
import Snackbar from "../components/base/snackbar";
import { $ } from "../utils/select"

export default class DateStore extends Observable {
    state: { year: number; month: number; historys: any; };

    constructor(time) {
        super();
        this.state = {
            year: time.getFullYear(),
            month: time.getMonth() + 1,
            historys: null,
        };
        
        if (checkLogin(true)) { 
            this.setup();
        }
    }

    
    async setup() {

        console.log('setup 실행')
        const { year, month} = this.state
        let historys = await this.getAllHistory(year, month)
        console.log('받아온 히스토리', historys)
        this.setState({ year, month, historys });
    }

    

    setState(nextState: { year: number; month: number; historys: any;}) {   
        this.state = nextState;
        this.notify(this.state);
    }


    async getAllHistory(year: number, month: number) {
        if (!checkLogin(true)) { 
            return;
        }

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
        if (!checkLogin(true)) { 
            return;
        }


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
        if (!checkLogin(true)) { 
            return;
        }


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