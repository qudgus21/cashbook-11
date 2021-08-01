import './index.scss';
import Component from "../../../../core/component";
import api from "../../../../utils/api";
import { $ } from '../../../../utils/select';
import { addClassSelector, removeClassSelector } from '../../../../utils/selectHandler';
import { checkLogin } from '../../../../utils/cookie';
import UnitHistory from './unit-history';
import comma from '../../../../utils/comma';

const isEmpty = (x) => (typeof x === 'undefined' || x === null || x === '');

const numToDay = '일 월 화 수 목 금 토'.split(' ');

export default class DailyHistory extends Component {

    setup () {
        this.state = this.props;
        this.calculateTotalPrice();
    }
    
    template (): string {
        const {month, date} = this.state.historys[0];
        return`
            <div class="container-daily-history">
                <div class="daily-history-title-bar">
                    <div><span>${this.state.month}월 ${this.state.date}일</span></b> ${numToDay[this.state.dayOfWeek]}</div>
                    <div 
                        id="title-bar-${month}-${date}"
                        class="container-daily-history-total-price"
                    >
                        <div class="text-income hidden">수입 ${comma(this.state.income)}원</div>
                        <div class="text-consume hidden">지출 ${comma(this.state.consume)}원</div>
                    </div>
                </div>
                <div class="container-unit-history">${this.state.historys.map((x, idx)=> {
                    return `
                        <div 
                            id="unit-history-${x.month}-${x.date}-${idx}"
                            class="wrapper-unit-history"
                        ></div>
                    `;
                }).join('\n')}</div>
            </div>
        `;
    }

    mounted () {
        this.hideTotalPriceIfZero();
        this.makeUnitHistory();
    }
    
    setEvent() {

    }

    calculateTotalPrice() {
        let consume = 0;
        let income = 0;
        
        this.state.historys.forEach(h => {
            if (isConsumeHistory(h)) {
                consume += h.value;
            } else {
                income += h.value;
            }
        });

        this.state.consume = consume;
        this.state.income = income;
    }

    makeUnitHistory() {
        this.state.historys.forEach((history, idx) => {
            new UnitHistory(
                $(`#unit-history-${history.month}-${history.date}-${idx}`).get(),
                { history }
            );
        });
    }
    
    hideTotalPriceIfZero() {
        const {month, date} = this.state.historys[0];

        if (this.state.income !== 0) {
            removeClassSelector($(`#title-bar-${month}-${date} .text-income`).get(), 'hidden');
        }
        if (this.state.consume !== 0) {
            removeClassSelector($(`#title-bar-${month}-${date} .text-consume`).get(), 'hidden');
        }
    }
}


const isConsumeHistory = (h: any): boolean => h.status == -1;

