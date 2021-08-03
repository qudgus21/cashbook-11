import './index.scss';
import Component from "../../../core/component";
import api from "../../../utils/api";
import { $ } from '../../../utils/select';
import { addClassSelector, removeClassSelector } from '../../../utils/selectHandler';
import Snackbar from '../../base/snackbar';
import { dateStore } from '../../../models';
import { SEARCH_HISTORY } from '../../../models/date-store';

export default class SearchBar extends Component {

    setup () {
        this.state = {};
        this.getData();
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
            <div class="container-searchbar">
                <ul>
                    <li class="li-date">
                        ${this.getDateLiteralTemplate()}
                    </li>

                    <li class="li-category">
                        ${this.getSelectLiteralTemplate(
                            this.state.categorys,
                            {name:'category', text:'분류'}
                        )}
                    </li>

                    <li class="li-content">
                        ${this.getContentLiteralTemplate()}
                    </li>

                    <li class="li-paytype">
                        ${this.getSelectLiteralTemplate(
                            this.state.userPayTypes,
                            {name:'payType', text:'결제수단'}
                        )}
                    </li>

                    <li class="li-value">
                        ${this.getValueLiteralTemplate()}
                    </li>

                    <button class="button-search">조회</button>
                </ul>
            </div>
        `;
    }

    getDateLiteralTemplate() {
        return `
            <label>일자</label>
            <div class="container-date">
                <input type="date" class="input-start-date" />
                <div> ~ </div>
                <input type="date" class="input-end-date" />
            </div>
        `;
    }

    getSelectLiteralTemplate(
        dataSet: any[], 
        label: {name: string, text: string}) {
        
        return `
            <label name="${label.name}">${label.text}</label>
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
            <label>금액</label>
            <div class="container-value">
                <input class="input-search-value" placeholder="min" /> 
                <div>-</div>
                <input class="input-search-value" placeholder="max" />
                <div>원<div>
            </div>
        `;
    }

    getContentLiteralTemplate() {
        return `
            <label>내용</label>
            <input class="input-search-content" placeholder="입력하세요" />
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
        
        const minimumValue = $('.input-search-value').get().value;
        const maximumValue = $('.input-search-value').get().value;
        
        if (CategoryPk <= 0) CategoryPk = '';
        if (PayTypePk <= 0) PayTypePk = '';
        
        const url = `/home/history/all?startDate=${startDate}&endDate=${endDate}&CategoryPk=${CategoryPk}` + 
            `&minimumValue=${minimumValue}&maximumValue=${maximumValue}`+ 
            `&PayTypePk=${PayTypePk}&content=${content}&`;
      
        const response = await api('GET', url);  

        if (response.isFail) {
            new Snackbar($('.snackbar').get(), { msg: response.message, backgroundColor: 'red', duration: 2000 });
            return false;
        } else {
            addClassSelector($('.wrapper-add-history').get(), 'wrapper-add-history-hidden');
            new Snackbar($('.snackbar').get(), { msg: response.message, duration: 2000 });
            return response.historys;
        }
    }
}

