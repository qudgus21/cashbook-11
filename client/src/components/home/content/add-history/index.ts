import './index.scss';
import Component from "../../../../core/component";
import api from "../../../../utils/api";
import { $ } from '../../../../utils/select';
import { addClassSelector, removeClassSelector } from '../../../../utils/selectHandler';
import { checkLogin } from '../../../../utils/cookie';
import { CATEGORY_TAG } from '../../../../constants/category';
import comma from '../../../../utils/comma';
import Snackbar from '../../../base/snackbar';
import { dateStore } from '../../../../models';

const isEmpty = (x) => (typeof x === 'undefined' || x === null || x === '');

export default class AddHistory extends Component {
    state: { whichRadioClicked: number; }
    
    setup () {
        this.state = { whichRadioClicked: -1 };
        this.state = { ...this.state, ...this.props };
    }
    
    template (): string {
        const categorys = CATEGORY_TAG.map((x,idx) =>({name: x.title, pk: idx }));
        categorys.shift();
        return `
            <div class="container-add-history-input">
                <input type="date" class="input-date"></input>
                <select class="select-create-categorys select" name="분류">
                    <option selected disabled>카테고리</option>
                    ${categorys 
                        ? categorys.map((data) => {
                            return `<option value="${data.pk}">${data.name}</option>`;
                        }).join('\n')
                        : 
                        ''}
                </select>
                <input 
                    type="radio" 
                    class="input-status consume" 
                    name="radio"
                    value="radio-consume"
                    checked
                ></input>
                <label for="radio-consume">지출</label>
                <input 
                    type="radio" 
                    class="input-status income" 
                    name="radio"
                    value="radio-income"
                ></input>
                <label for="radio-income">수입</label>
                <input
                    type="textarea"
                    class="input input-content"
                    placeholder="내용" 
                >
                </input>
                <input 
                    type="text" 
                    class="input input-paytype" 
                    placeholder="결제수단"
                >
                </input>
                <input 
                    type="text" 
                    class="input input-value" 
                    placeholder="금액"
                >
                    원
                </input>
                <button class="button-add-history">추가</button>
                <button class="button-cancel">취소</button>
            </div>
        `;
    }

    mounted () {
    }
    
    setEvent() {
        this.addEvent('click','.input-status.consume', (e) => {
            this.state.whichRadioClicked = -1;
        });

        this.addEvent('click','.input-status.income', (e) => {
            this.state.whichRadioClicked = 1;
        });

        this.addEvent('click','.button-add-history', async (e) => {
            e.preventDefault();

            // api create 전송
            const isCreated = await this.requestCreatingHistory();
            if (isCreated) {
                dateStore.refresh();
            }
        });

        this.addEvent('click','.button-cancel', (e) => {
            e.preventDefault();

            // api create 전송
            addClassSelector($('.wrapper-add-history').get(), 'wrapper-add-history-hidden');
        });
    }

    async requestCreatingHistory () {
        const time = $('.input-date').get().value;
        const CategoryPk = $('.select-create-categorys').get().value;
        const status = this.state.whichRadioClicked;
        const payType = $('.input-paytype').get().value;
        const content = $('.input-content').get().value;
        const value = $('.input-value').get().value;
        

        const response = await api('POST', `/home/history`, {
            time, CategoryPk, status, payType, content, value
         });
        
        if (response.isFail) {
            new Snackbar($('.snackbar').get(), { msg: response.message, backgroundColor: '#f45552', duration: 2000 });
            return false;
        } else {
            addClassSelector($('.wrapper-add-history').get(), 'wrapper-add-history-hidden');
            new Snackbar($('.snackbar').get(), { msg: response.message, duration: 2000 });
            return true;
        }
    }

    temp() {}
}

