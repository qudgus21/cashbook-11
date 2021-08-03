import './index.scss';
import Component from "../../../core/component";
import api from "../../../utils/api";
import { $ } from '../../../utils/select';
import { addClassSelector, removeClassSelector } from '../../../utils/selectHandler';
import { checkLogin } from '../../../utils/cookie';
import DailyHistory from './daily-history';
import { isEmpty } from '../../../utils/util-func';


export default class MonthHistory extends Component {

    setup () {
        this.state = this.props;
    }

    template (): string {
        return`
            <div class="container-month-history">
                ${this.state.dayArray
                    .map((_:any, idx: number): string => {
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
}