import './index.scss';
import Component from "@core/component";
import { $ } from '@utils/select';
import DailyHistory from './daily-history';
import { filterStore } from '@src/models';
export default class MonthHistory extends Component {

    setup () {
        this.state = this.props;
        console.log('Month history 의 setup() 실행!');
    }

    template (): string {
        console.log('month history template() 호출!');
        // <div class="container-month-history">
        const text = `
            ${this.state.dayArray
                .map((time:any, idx: number): string => {
                    return `<div id="daily-history-${time}" class="wrapper-daily-history fadein" style="animation-delay:${filterStore.state.delay + 0.15 * idx}s;"></div>`;
                }).join('\n')
            }
        `;
        console.log(text);
        //</div>
        return text;
    }

    setState(newState) {

        this.state = { ...this.state, ...newState};
        console.log("나의 부모는 누구냐?");
        console.log(this.$target);

        console.log("나의 스테이트는 다음과 같다.");
        console.log(this.state);
        this.render();
    }


    mounted () {
        this.setDailyHistoryOrderedByDescendingDay();
    }

    setDailyHistoryOrderedByDescendingDay() {
        console.log(`setDailyHistoryOrderedByDescendingDay 함수 호출`);
        console.log(this.state.dayArray);
        console.log(`dayArray 배열입니다.`);
        this.state.dayArray.forEach((time) => {
            let historys = this.state.historys[time];
            console.log(`#daily-history-${time}`);
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