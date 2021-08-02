import './index.scss';
import Component from "../../../core/component";
import { $ } from '../../../utils/select';
import DailyHistory from './daily-history';

export default class MonthHistory extends Component {

    setup () {
        this.state = this.props;
        console.log('MonthHistory 의 setup(),',this.state);
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

    setDailyHistoryOrderedByDescendingDay() {
        this.state.dayArray.forEach((time, idx) => {
            
            let historys = this.state.historys[time];
            new DailyHistory(
                $(`#daily-history-${idx}`).get(), 
                { 
                    historys,
                    time
                },
            );
        });
    }
}