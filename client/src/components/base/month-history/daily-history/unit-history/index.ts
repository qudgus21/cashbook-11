import './index.scss';
import Component from "../../../../../core/component";
import api from "../../../../../utils/api";
import { $ } from '../../../../../utils/select';
import { addClassSelector, removeClassSelector } from '../../../../../utils/selectHandler';
import { checkLogin } from '../../../../../utils/cookie';

const isEmpty = (x) => (typeof x === 'undefined' || x === null || x === '');

export default class UnitHistory extends Component {

    setup () {
        this.state = this.props;
    }
    
    template (): string {
        return `
            <div class="container-unit-history-info"> 
                <div class="info info-category">${this.state.history.CategoryPk}</div>
                <div 
                    class="info info-content" 
                    title="${this.state.history.content}"
                >
                    ${this.state.history.content}
                </div>
                <div class="info info-paytype">${this.state.history.PayTypePk}</div>
                <div class="info info-price">${this.state.history.status*this.state.history.value}원</div>
            </div>
        `;
    }

    mounted () {
        
    }
    
    setEvent() {

    }
  

}

