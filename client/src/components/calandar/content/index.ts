import Component from "../../../core/component";
import { dateStore } from "../../../models";
import { getDates } from "../../../utils/date";
import { $ } from "../../../utils/select";
import './index.scss'   

export default class Content extends Component {
    
    setup () {
        this.state = {

        }
        dateStore.subscribe(this.makeCalendar.bind(this));
    }
    
    template (): string { 
        return ` 
            <div class="container-content">
                <div class="calendar">
                    <div class="dates"></div>
                </div>
            </div>
        `
    }


    


    paintCalendar(dates: any): void {
        const historyData = this.sortHistory(dateStore.state.historys)
        const storeYear = dateStore.state.year;
        const storeMonth = dateStore.state.month;
        const now = new Date
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;
        const currentDate = now.getDate();
        let isNow = false;
        if (storeYear === currentYear && storeMonth === currentMonth) {
            isNow = true;
        }
        let notCurrent = true;

        const findItem = (date) => { 
            let idx =  historyData.findIndex(item => { 
                return item.date === date;
            })
            console.log(historyData[idx])
            return historyData[idx]
        }

        dates.forEach((date, i) => {
            if (notCurrent && date === 1) {
                notCurrent = false;
            } else if(!notCurrent && date === 1){ 
                notCurrent = true;
            }

            let dayHistory = findItem(date)
            dates[i] = `
            <div class="date${notCurrent ? ` notCurrent` : ``}${!notCurrent && isNow && date === currentDate ? ` today` : ``}">
                ${!notCurrent ? 
                `
                    <div>${dayHistory === undefined ? ``:`${dayHistory.income}`}</div>
                    <div>${dayHistory === undefined ? ``:`${dayHistory.consume}`}</div>
                `: ``}
                <div class="dateNum">${date}</div>  
            </div>`;
        })
        const $dates = $('.dates').get()
        if ($dates) { 
            $('.dates').get().innerHTML = dates.join('');
            const $cells = $('.dates .date').getAll();
            if ($cells.length === 35) { 
                $cells[28].style.borderBottomLeftRadius = "15px";
            }
        }
    }


    makeCalendar() {
        this.paintCalendar(getDates(dateStore.state.year, dateStore.state.month))
    }

    sortHistory(historys: any): any {
        let sorted = [];
        let date, idx, target;
        historys.forEach(history => {
            date = new Date(history.time).getDate()
            idx = sorted.findIndex(item => { 
                return item.date === date;
            })
            if (idx === -1) {
                sorted.push({
                    date,
                    income: history.status === 1 ? history.value * history.status : 0,
                    consume: history.status === -1 ? history.value * history.status : 0
                })
            } else { 
                target = sorted[idx];
                history.status === 1 ? target.income += history.value * history.status : target.consume+=history.value * history.status
            }
        })
        sorted.sort((a, b) => { 
            return a.date - b.date
        })
        return sorted;
    }


    mounted() {
    }

    setEvent(){

    }

}