import './index.scss';
import Component from "@core/component";
import api from "@utils/api";
import { $ } from '@utils/select';
import { CATEGORY_TAG } from '@constants/category';
import comma from '@utils/comma';
import Snackbar from '@components/base/snackbar';
import { dateStore } from '@src/models';

export default class UnitHistory extends Component {

    setup () {
        this.state = this.props;
    }
    
    template (): string {
        const { CategoryPk, content, PayTypePk, PayType, status, value, pk } = this.state.history;
        return `
            <div class="container-unit-history-info" title="클릭시 삭제 알람이 뜹니다!"> 
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
        
        $(`#history-pk-${pk}`).get().style.backgroundColor = CATEGORY_TAG[CategoryPk].color;
    }

    setEvent() {
        this.addEvent('click','.wrapper-month-history .container-unit-history-info', (e) => {
            e.preventDefault();
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
            new Snackbar($('.snackbar').get(), { msg: response.message, backgroundColor: '#f45552', duration: 2000 });
            return false;
        } else {
            new Snackbar($('.snackbar').get(), { msg: response.message, duration: 2000 });
            return true;
        }
    }

}

