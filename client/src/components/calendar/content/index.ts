import Component from "@core/component";
import { dateStore } from "@src/models";
import { getDates } from "@utils/date";
import comma from "@utils/comma";
import { $ } from "@utils/select";
import './index.scss'   
import api from "@utils/api";
import Snackbar from "@components/base/snackbar";

export default class Content extends Component {
    
    setup () {
        this.state = {};
        dateStore.subscribe(this.makeCalendar.bind(this));
    }
    
    template (): string { 
        return ` 
            <div class="container-content-calendar">
                <div class="calendar">
                    <div class="dates"></div>
                </div>
                <div class="footer">
                    <div>
                        <span class="total-income">총 수입 &nbsp;${123123}</span>&nbsp;&nbsp;&nbsp;
                        <span class="total-consume">총 지출 &nbsp;${123123}</span>
                    </div>
                    <div class="total-sum">
                        총계 &nbsp;${123213}
                    </div>
                </div>
            </div>
        `;
    }


    makeValueTemplate (dayHistory){
        if (dayHistory === undefined) return ``;

        let consume = dayHistory.consume;
        let income = dayHistory.income;
        let total = consume + income;
        return`
            ${`<div class="day-total">${comma(total)}</div>`}
            ${consume!==0 ?`<div class="day-consume">${comma(consume)}</div>`:`` }
            ${income !==0 ?`<div class="day-income">${comma(income)}</div>`:`` }
        `
    }

    makeFooterData(historyData) {
        let totalConsume = 0;
        let totalIncome = 0;
        let totalSum = 0;
        historyData.forEach((history) => {
            totalConsume += history.consume;
            totalIncome += history.income;
        })
        totalSum = totalConsume + totalIncome;

        $('.total-income').get().textContent = `총 수입 ${comma(totalIncome)}`;
        $('.total-consume').get().textContent = `총 지출 ${comma(totalConsume)}`;
        $('.total-sum').get().textContent = `총계 ${comma(totalSum)}`;
    }


    paintCalendar(dates: any): void {
        const historyData = this.sortHistory(dateStore.state.historys);
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
            return historyData[idx];
        }

        dates.forEach((date, i) => {
            if (notCurrent && date === 1) {
                notCurrent = false;
            } else if(!notCurrent && date === 1){ 
                notCurrent = true;
            }

            let dayHistory = findItem(date);

            dates[i] = `
            <div class="date-${date} date${notCurrent ? ` notCurrent` : ``}${!notCurrent && isNow && date === currentDate ? ` today` : ``} fadein" style="animation-delay: ${0.05*i}s;">
                ${!notCurrent ? 
                `   <div class="day-history">
                    ${this.makeValueTemplate(dayHistory)}
                    </div>
                `: ``}
                <div class="dateNum">${date}</div>  
            </div>`;
        })
        const $dates = $('.dates').get();
        if ($dates) { 
            $('.dates').get().innerHTML = dates.join('');
            const $cells = $('.dates .date').getAll();
            if ($cells.length === 35) { 
                $cells[28].style.borderBottomLeftRadius = "15px";
            }
            this.addDateClickEvent();
   
        }
        this.makeFooterData(historyData);
    }

    makeCalendar() {
        if (location.pathname === '/calendar') { 
            this.paintCalendar(getDates(dateStore.state.year, dateStore.state.month));
        }
    }


    addDateClickEvent(){ 
        $('.date').getAll().forEach(node => { 
            node.addEventListener('click', this.dateHistoryHandler.bind(this));
        })
    }


    sortHistory(historys: any): any {
        let sorted = [];
        let date, idx, target;
        if (historys) {
            historys.forEach(history => {
                date = new Date(history.time).getDate();
                idx = sorted.findIndex(item => {
                    return item.date === date;
                })
                if (idx === -1) {
                    sorted.push({
                        date,
                        income: history.status === 1 ? history.value * history.status : 0,
                        consume: history.status === -1 ? history.value * history.status : 0
                    });
                } else {
                    target = sorted[idx];
                    history.status === 1 ? target.income += history.value * history.status : target.consume += history.value * history.status;
                }
            })
        }
        sorted.sort((a, b) => { 
            return a.date - b.date;
        })
        return sorted;
    }

    async getDateHistory(e) { 
        const $date = e.currentTarget;
        const year = dateStore.state.year;
        const month = dateStore.state.month;
        const day = $date.classList[0].split('-')[1];        
        const startDate = `${year}-${month}-${day}`;
        const endDate = `${year}-${month}-${day}`;
        const response = await api('GET', `/calendar/history/all?startDate=${startDate}&endDate=${endDate}`);
        if (response.isFail) {
            new Snackbar($('.snackbar').get(), { msg: response.message, duration: 2000 });
            return;
        } else {
            return response.historys;
        }
    }


    async dateHistoryHandler(e) { 
        let historys = await this.getDateHistory(e);
        
        historys = historys.sort((a, b) => { 
            return a.time - b.time;
        })

    }

    mounted() {
        this.makeCalendar();
    }
}