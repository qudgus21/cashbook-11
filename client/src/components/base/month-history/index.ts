import './index.scss';
import Component from "../../../core/component";
import api from "../../../utils/api";
import { $ } from '../../../utils/select';
import { addClassSelector, removeClassSelector } from '../../../utils/selectHandler';
import { checkLogin } from '../../../utils/cookie';
import DailyHistory from './daily-history';
import { dateStore, filterStore } from '../../../models';

const isEmpty = (x) => (typeof x === 'undefined' || x === null || x === '');

export default class MonthHistory extends Component {

    setup () {
        this.state = this.props;
        this.convertHistorysToHandyObject();
        this.state.dayArray = this.getDayArray();
        filterStore.subscribe(this.update.bind(this));
    }


    update () {
        this.filteringHistory();
    }
    
    template (): string {
        
        return`
            <div class="container-month-history">
                ${this.state.dayArray
                    .map((_:any, idx: number):string => {
                        return `<div id="daily-history-${idx}" class="wrapper-daily-history"></div>`;
                    }).join('\n')
                }
            </div>
        `;
    }

    mounted () {
        this.setDailyHistoryOrderedByDescendingDay();
    }
    
    setEvent() {

    }

    convertHistorysToHandyObject() {
        if (typeof this.state.historys !== 'undefined') {
            this.state.historys = this.state.historys.map((h: any) => {
                let date = new Date(h.time);
                h.month = date.getMonth() + 1;
                h.date = date.getDate();
                h.dayOfWeek = date.getDay();
                h.time = `${date.getHours()}:${date.getMinutes()}`;
                return h;
            });

            const historys = {};

            this.state.historys.forEach((h: any)=> {
                if (isEmpty(historys[h.date])) {
                    historys[h.date] = [h];
                } else {
                    historys[h.date].push(h);
                }
            });

            this.state.historys = historys;
        }
    }

    setDailyHistoryOrderedByDescendingDay() {
        this.state.dayArray.forEach((date, idx) => {
            
            let historys = this.state.historys[date];
            new DailyHistory(
                $(`#daily-history-${idx}`).get(), 
                { 
                    historys,
                    date,
                    dayOfWeek: historys[0].dayOfWeek,
                    month: historys[0].month,
                },
            );
        });
    }

    getDayArray() {
        if (typeof this.state.historys === 'undefined') return [];
        return  Object.keys(this.state.historys).sort((a: any,b: any):any => b-a);
    }

    filteringHistory() {
        this.state.historys = dateStore.getHistorys();
        
        this.state.historys = this.state.historys.filter(h => {
            if (!filterStore.state.isIncomeBoxClicked && h.status === 1) return false;
            else if (!filterStore.state.isConsumeBoxClicked && h.status === -1) return false;

            return true;
        });
        console.log('filter 한 데이터는 다음과 같습니다.');
        console.log(this.state.historys);

        this.convertHistorysToHandyObject();
        this.state.dayArray = this.getDayArray();

        this.render();
    }
}