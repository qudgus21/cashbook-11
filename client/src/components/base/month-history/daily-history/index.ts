import './index.scss';
import Component from "../../../../core/component";
import api from "../../../../utils/api";
import { $ } from '../../../../utils/select';
import { addClassSelector, removeClassSelector } from '../../../../utils/selectHandler';
import { checkLogin } from '../../../../utils/cookie';
import UnitHistory from './unit-history';

const isEmpty = (x) => (typeof x === 'undefined' || x === null || x === '');

export default class DailyHistory extends Component {

    setup () {
        this.state = this.props;
    }
    
    template (): string {
        return`
            <div class="container-daily-history">
                <div class="daily-history-title-bar">
                    <div>${this.state.month}월 ${this.state.day}일 ${this.state.dayOfWeek}</div>
                    <div class="container-daily-history-total-price">
                        <div class="text-consume">수입 ${this.state.income}원</div>
                        <div class="text-consume">지출 ${this.state.consume}원</div>
                    </div>
                </div>
                <div class="container-unit-history">${this.state.historys.map((x, idx)=> {
                    return `
                        <div 
                            id="unit-history-${x.month}-${x.day}-${idx}"
                            class="wrapper-unit-history"
                        ></div>
                    `;
                }).join('\n')}</div>
            </div>
        `;
    }

    mounted () {
        this.state.historys.forEach((history, idx) => {
            new UnitHistory(
                $(`#unit-history-${history.month}-${history.day}-${idx}`).get(),
                { history }
            );
        });
    }
    
    setEvent() {

    }
  
}

