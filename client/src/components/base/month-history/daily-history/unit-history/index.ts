import './index.scss';
import Component from "../../../../../core/component";
import api from "../../../../../utils/api";
import { $ } from '../../../../../utils/select';
import { addClassSelector, removeClassSelector } from '../../../../../utils/selectHandler';
import { checkLogin } from '../../../../../utils/cookie';
import { CATEGORY_TAG } from '../../../../../constants/category';
import comma from '../../../../../utils/comma';

const isEmpty = (x) => (typeof x === 'undefined' || x === null || x === '');

export default class UnitHistory extends Component {

    setup () {
        this.state = this.props;
    }
    
    template (): string {
        const { CategoryPk, content, PayTypePk, PayType, status, value, pk } = this.state.history;
        return `
            <div class="container-unit-history-info"> 
                <div id="history-pk-${pk}"class="info info-category"><div>${CATEGORY_TAG[CategoryPk-1].title}</div></div>
                <div 
                    class="info info-content" 
                    title="${content}"
                >
                    ${content}
                </div>
                <div class="info info-paytype">${PayTypePk}</div>
                <div class="info info-price">${comma(status*value)}원</div>
            </div>
        `;
    }

    mounted () {
        const { CategoryPk, pk } = this.state.history;
        console.log(CategoryPk, CATEGORY_TAG[CategoryPk-1]);
        
        $(`#history-pk-${pk}`).get().style.backgroundColor = CATEGORY_TAG[CategoryPk-1].color;
        console.log($(`#history-pk-${pk}`).get());
    }
    
    setEvent() {

    }
  

}

