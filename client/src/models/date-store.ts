import Observable from "../core/observable";
import api from "../utils/api";
import { getDates } from "../utils/date";
import { checkLogin } from "../utils/cookie";
import Snackbar from "../components/base/snackbar";
import { $ } from "../utils/select"
import { isEmpty } from "../utils/util-func";

export default class DateStore extends Observable {
    state: { year: number; month: number; historys: any[]; };

    constructor(time) {
        super();
        this.state = {
            year: time.getFullYear(),
            month: time.getMonth() + 1,
            historys: null,
        };
        
        if (checkLogin(false)) { 
            this.setup();
        }
    }

    
    async setup() {

        const { year, month} = this.state
        let historys = await this.getAllHistory(year, month)
        this.setState({ year, month, historys });
    }

    

    setState(nextState: { year: number; month: number; historys: any[];}) {   
        this.state = nextState;
        this.notify(this.state);
    }

    async refresh() {
        console.log('dateStore refresh called!');
        const { year, month } = this.state;

        let historys = await this.getAllHistory(year, month)
        
        this.setState({ year, month, historys });
    }

    async getAllHistory(year: number, month: number) {
        if (!checkLogin(false)) { 
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

    getHistorys(): any[] {
        if (isEmpty(this.state.historys)) return [];
        return this.state.historys.map(x=>Object.assign({}, x));
    }
}