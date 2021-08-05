import './index.scss';
import Component from "@core/component";
import { $ } from '@utils/select';
import DailyHistory from './daily-history';
import { filterStore } from '@src/models';
export default class MonthHistory extends Component {

    setup () {
        this.state = this.props;
    }

    template (): string {
        // <div class="container-month-history">
        const text = `
            ${this.state.dayArray
                .map((time:any, idx: number): string => {
                    return `<div id="daily-history-${time}" class="wrapper-daily-history fadein" style="animation-delay:${filterStore.state.delay + 0.20 * idx}s;"></div>`;
                }).join('\n')
            }
        `;
        //</div>
        return text;
    }

    setState(newState) {

        this.state = { ...this.state, ...newState};

        this.render();
    }


    mounted () {
        this.setDailyHistoryOrderedByDescendingDay();
    }

    setDailyHistoryOrderedByDescendingDay() {
        this.state.dayArray.forEach((time) => {
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