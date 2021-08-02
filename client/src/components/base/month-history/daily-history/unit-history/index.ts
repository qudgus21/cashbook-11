import './index.scss';
import Component from "../../../../../core/component";
import api from "../../../../../utils/api";
import { $ } from '../../../../../utils/select';
import { addClassSelector, removeClassSelector } from '../../../../../utils/selectHandler';
import { checkLogin } from '../../../../../utils/cookie';
import { CATEGORY_TAG } from '../../../../../constants/category';
import comma from '../../../../../utils/comma';
import Snackbar from '../../../snackbar';
import { dateStore } from '../../../../../models';

const isEmpty = (x) => (typeof x === 'undefined' || x === null || x === '');

export default class UnitHistory extends Component {

    setup () {
        this.state = this.props;
    }
    
    template (): string {
        const { CategoryPk, content, PayTypePk, PayType, status, value, pk } = this.state.history;
        return `
            <div class="container-unit-history-info"> 
                <div id="history-pk-${pk}"class="info info-category"><div>${CATEGORY_TAG[CategoryPk].title}</div></div>
                <div 
                    class="info info-content" 
                    title="${content}"
                >
                    ${content}
                </div>
                <div class="info info-paytype">${PayType.name}</div>
                <div class="info info-price">${comma(status*value)}원</div>
            </div>
        `;
    }

    mounted () {
        const { CategoryPk, pk } = this.state.history;
        console.log(CategoryPk, CATEGORY_TAG[CategoryPk]);
        
        $(`#history-pk-${pk}`).get().style.backgroundColor = CATEGORY_TAG[CategoryPk].color;
        console.log($(`#history-pk-${pk}`).get());
    }

    setEvent() {
        this.addEvent('click','.wrapper-month-history .container-unit-history-info', (e) => {
            e.preventDefault();
            console.log('나 눌림? 뀨?');
            this.historyClickEventForDelete();
            // api create 전송
        });
    }

    async historyClickEventForDelete() {

        if (confirm("정말 삭제하시겠습니까?")) {
            const isDeleted = await this.requestDelete();
            if (isDeleted) {
                dateStore.refresh();
            }
        } else {
            return;
        
        }
    }    
    
    async requestDelete() {
        const response = await api('DELETE', `/home/history/${this.state.history.pk}`);

        if (response.isFail) {
            new Snackbar($('.snackbar').get(), { msg: response.message, backgroundColor: 'red', duration: 2000 });
            return false;
        } else {
            new Snackbar($('.snackbar').get(), { msg: response.message, duration: 2000 });
            return true;
        }
    }

}
