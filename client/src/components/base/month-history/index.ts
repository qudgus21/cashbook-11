import './index.scss';
import Component from "../../../core/component";
import { $ } from '../../../utils/select';
import DailyHistory from './daily-history';

export default class MonthHistory extends Component {

    setup () {
        this.state = this.props;
    }

    template (): string {
        return`
            <div class="container-month-history">
                ${this.state.dayArray
                    .map((time:any, idx: number): string => {
                        return `<div id="daily-history-${time}" class="wrapper-daily-history"></div>`;
                    }).join('\n')
                }
            </div>
        `;
    }

    mounted () {
        this.setDailyHistoryOrderedByDescendingDay();
    }

    setDailyHistoryOrderedByDescendingDay() {
        this.state.dayArray.forEach((time, idx) => {
            
            let historys = this.state.historys[time];
            new DailyHistory(
                $(`#daily-history-${time}`).get(), 
                { 
                    historys,
                    time
                },
            );
        });
    }
}