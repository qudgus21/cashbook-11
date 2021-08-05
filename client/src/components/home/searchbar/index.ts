import './index.scss';
import Component from "@core/component";
import api from "@utils/api";
import { $ } from '@utils/select';
import { addClassSelector } from '@utils/selectHandler';
import Snackbar from '@components/base/snackbar';
import { dateStore, filterStore } from '@src/models';
import { SEARCH_HISTORY } from '@models/date-store';
import { checkLogin } from '@utils/cookie';

export default class SearchBar extends Component {

    setup () {
        this.state = {};
        if (checkLogin(false)) {
            this.getData();
        }
        dateStore.subscribe(this.updateUserPayType.bind(this));
    }

    async updateUserPayType() {
        const response = await api('GET', '/home/user-pay-type');

        if (response.isFail) {
            return;
        }
        this.state.userPayTypes = response.userPayTypes;

        $('.li-paytype').get().innerHTML = this.getSelectLiteralTemplate(
            this.state.userPayTypes,
            {name:'payType', text:'결제수단'}
        )
    }

    async getData() {
        const state = {
            categorys: (await api('GET', '/home/category')).categorys,
            userPayTypes: (await api('GET', '/home/user-pay-type')).userPayTypes,
        };

        this.setState(state);
    }
    
    template (): string { 
        return `
            <ul class="fadein">
                <li class="li-date fadein"
                style="animation-delay: 0.05s;">
                    ${this.getDateLiteralTemplate()}
                </li>

                <li class="li-category fadein"
                style="animation-delay: 0.1s;">
                    ${this.getSelectLiteralTemplate(
                        this.state.categorys,
                        {name:'category', text:'분류'}
                    )}
                </li>

                <li class="li-content fadein"
                style="animation-delay: 0.15s;">
                    ${this.getContentLiteralTemplate()}
                </li>

                <li class="li-paytype fadein"
                style="animation-delay: 0.2s;">
                    ${this.getSelectLiteralTemplate(
                        this.state.userPayTypes,
                        {name:'payType', text:'결제수단'}
                    )}
                </li>

                <li class="li-value fadein"
                style="animation-delay: 0.25s;">
                    ${this.getValueLiteralTemplate()}
                </li>

                <button class="button-search fadein"
                style="animation-delay: 0.3s;">조회</button>
            </ul>
        `;
    }

    getDateLiteralTemplate() {
        return `
            <label class="label-for-calendar" for="start-date">일자</label>
            <div class="container-date">
                <input name="start-date" type="date" class="input-start-date" />
                <div> ~ </div>
                <input type="date" class="input-end-date" />
            </div>
        `;
    }

    getSelectLiteralTemplate(
        dataSet: any[], 
        label: {name: string, text: string}) {
        
        return `
            <label for="${label.name}">${label.text}</label>
            <select class="select-${label.name}" name="${label.name}">
                <option value="-1" selected disabled>선택하세요</option>
                <option value="-1">선택안함</option>
                ${dataSet 
                    ? dataSet.map((data) => {
                        return `<option value="${data.pk}">${data.name}</option>`;
                    }).join('\n')
                    : 
                    ''}
            </select>
        `;
    }

    getValueLiteralTemplate() {
        return `
            <label class="label-for-value" for="minimum">금액</label>
            <div class="container-value">
                <input
                    type="number"
                    name="minimum" 
                    class="input-search-value min" 
                    min="1"
                    placeholder="최소 금액를 입력하세요" 
                /> 
                <div>~</div>
                <input 
                    type="number" 
                    min="1"
                    class="input-search-value max" 
                    placeholder="최대 금액을 입력하세요" 
                />
            </div>
        `;
    }

    getContentLiteralTemplate() {
        return `
            <label for="input-content">내용</label>
            <input class="input-search-content" name="input-content" placeholder="입력하세요" />
        `;
    }


    setEvent() {
        this.addEvent('click','.button-search', async (e) => {
            e.preventDefault();

            const historys: any = await this.requestGetAllHistorys();
            
            if (historys) {
                const nextState: { year: number; month: number; historys: any[]; type: number;} = {
                    year: dateStore.state.year,
                    month: dateStore.state.month,
                    historys,
                    type: SEARCH_HISTORY, 
                };

                filterStore.state.delay = 0;   
                
                dateStore.setState(nextState);
            }
        });
    }

    async requestGetAllHistorys () {

        const startDate = $('.input-start-date').get().value;
        const endDate = $('.input-end-date').get().value;
        let CategoryPk = $('.select-category').get().value;
        const content = $('.input-search-content').get().value;
        let PayTypePk = $('.select-payType').get().value;
        
        const minimumValue = $('.input-search-value.min').get().value;
        const maximumValue = $('.input-search-value.max').get().value;
        
        if (CategoryPk <= 0) CategoryPk = '';
        if (PayTypePk <= 0) PayTypePk = '';
        
        const url = `/home/history/all?startDate=${startDate}&endDate=${endDate}&CategoryPk=${CategoryPk}` + 
            `&minimumValue=${minimumValue}&maximumValue=${maximumValue}`+ 
            `&PayTypePk=${PayTypePk}&content=${content}&`;
      
        const response = await api('GET', url);  

        if (response.isFail) {
            new Snackbar($('.snackbar').get(), { msg: response.message, backgroundColor: '#f45552', duration: 2000 });
            return false;
        } else {
            addClassSelector($('.wrapper-add-history').get(), 'wrapper-add-history-hidden');
            new Snackbar($('.snackbar').get(), { msg: response.message, duration: 2000 });
            return response.historys;
        }
    }
}

