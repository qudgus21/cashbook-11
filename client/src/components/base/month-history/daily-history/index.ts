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
                <div>${this.state.month}월 ${this.state.day}일 </div>
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

