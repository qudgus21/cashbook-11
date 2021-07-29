import Component from "../../../core/component";
import { dateStore } from "../../../models";
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

    makeCalendar() { 
        const viewYear = dateStore.state.year;
        const viewMonth = dateStore.state.month;
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
        dates.forEach((date, i) => {
            dates[i] = `
            <div class="date">
                <div class="dateNum">${date}</div>
            </div>`;
        })
        $('.dates').get().innerHTML = dates.join('');
    }

    mounted() {
        this.makeCalendar()    
    }

    setEvent(){

    }

}