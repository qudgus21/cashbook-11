import './index.scss';
import Component from "@core/component";
import api from "@utils/api";
import { $ } from '@utils/select';
import { addClassSelector, removeClassSelector } from '@utils/selectHandler';
import { CATEGORY_TAG } from '@constants/category';
import Snackbar from '@components/base/snackbar';
import { dateStore } from '@src/models';

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
                <div class="container-input-first-floor">
                    <div class="consume">
                        <input 
                            type="radio" 
                            class="input-status consume" 
                            name="radio"
                            value="radio-consume"
                            checked
                        ></input>
                        <label for="radio-consume">지출</label>
                    </div>
                    <div class="income">
                        <input 
                            type="radio" 
                            class="input-status income" 
                            name="radio"
                            value="radio-income"
                        ></input>
                        <label for="radio-income">수입</label>
                    </div>
                </div>
                <div class="container-input-second-floor">
                    <input type="date" class="input-date"></input>
                    <select class="select-create-categorys select" name="분류">
                        <option selected disabled value="-1">카테고리를 선택해주세요.</option>
                        ${categorys 
                            ? categorys.map((data) => {
                                return `<option value="${data.pk}">${data.name}</option>`;
                            }).join('\n')
                            : 
                            ''}
                    </select>
                </div>
                <div class="container-input-third-floor">
                    <input
                        type="textarea"
                        class="input input-content"
                        placeholder="내용을 입력해주세요." 
                    >
                    </input>
                </div>
                <div class="container-input-fourth-floor">
                    <input 
                        type="text" 
                        class="input input-paytype" 
                        placeholder="결제수단을 입력해주세요."
                    >
                    </input>
                    <input 
                        type="number" 
                        class="input input-value" 
                        placeholder="금액을 입력해주세요. ( 0 이하는 안됩니다!! )"
                    ></input>
                </div>
                <div class="container-input-five-floor">
                    <button class="button-add-history">추가</button>
                    <button class="button-cancel">취소</button>
                </div>
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

            if (!this.validateInputValues()) return;

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

    validateInputValues ():boolean {
        if  ($('.input-date').get().value  == '') {
            new Snackbar($('.snackbar').get(), { msg: '날짜를 선택해주세요.', backgroundColor: '#f45552', duration: 2000 });
            return false;
        } else if ($('.select-create-categorys').get().value == -1) {
            new Snackbar($('.snackbar').get(), { msg: '카테고리를 선택해주세요.', backgroundColor: '#f45552', duration: 2000 });
            return false;
        } else if ($('.input-content').get().value  == '') {
            new Snackbar($('.snackbar').get(), { msg: '내용을 입력해주세요.', backgroundColor: '#f45552', duration: 2000 });
            return false;
        } else if ($('.input-paytype').get().value  == '') {
            new Snackbar($('.snackbar').get(), { msg: '결제수단를 입력해주세요.', backgroundColor: '#f45552', duration: 2000 });
            return false;
        } else if ($('.input-value').get().value == '') {
            new Snackbar($('.snackbar').get(), { msg: '금액을 입력해세요.', backgroundColor: '#f45552', duration: 2000 });
            return false;
        }

        if (parseInt($('.input-value').get().value, 10) <= 0) {
            new Snackbar($('.snackbar').get(), { msg: '0 이하의 금액이 입력되었습니다.', backgroundColor: '#f45552', duration: 2000 });
            return false;
        }

        return true;
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

