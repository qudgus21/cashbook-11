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
        dates.forEach((date, i) => {
            if (notCurrent && date === 1) {
                notCurrent = false;
            } else if(!notCurrent && date === 1){ 
                notCurrent = true;
            }
            dates[i] = `
            <div class="date${notCurrent?` notCurrent`:``}${!notCurrent&&isNow&&date===currentDate?` today`:``}">
                <div class="dateNum">${date}</div>
            </div>`;
        })
        $('.dates').get().innerHTML = dates.join('');
        const $cells = $('.dates .date').getAll();
        if ($cells.length === 35) { 
            $cells[28].style.borderBottomLeftRadius = "15px";
        }
    }

    makeCalendar() { 
        this.paintCalendar(getDates(dateStore.state.year, dateStore.state.month))
    }

    mounted() {
        this.makeCalendar()    
    }

    setEvent(){

    }

}