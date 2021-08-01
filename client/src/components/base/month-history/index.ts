import './index.scss';
import Component from "../../../core/component";
import api from "../../../utils/api";
import { $ } from '../../../utils/select';
import { addClassSelector, removeClassSelector } from '../../../utils/selectHandler';
import { checkLogin } from '../../../utils/cookie';
import DailyHistory from './daily-history';

const isEmpty = (x) => (typeof x === 'undefined' || x === null || x === '');

export default class MonthHistory extends Component {

    setup () {
        this.state = this.props;
        this.convertHistorysToHandyObject();

        this.state.dayArray = this.getDayArray();
    }
    
    template (): string {
        
        return`
            <div class="wrapper-month-history">
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
        this.state.dayArray.forEach((day, idx) => {
            
            let historys = this.state.historys[day];
            new DailyHistory(
                $(`#daily-history-${idx}`).get(), 
                { 
                    historys,
                    day, 
                    month: historys[0].month,
                },
            );
        });
    }

    getDayArray() {
        if (typeof this.state.historys === 'undefined') return [];
        return  Object.keys(this.state.historys).sort((a: any,b: any):any => b-a);
    }
}

