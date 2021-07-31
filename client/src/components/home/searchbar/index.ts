import './index.scss';
import Component from "../../../core/component";
import api from "../../../utils/api";
import { $ } from '../../../utils/select';
import { removeClassSelector } from '../../../utils/selectHandler';

export default class SearchBar extends Component {

    setup () {
        this.state = {};
        this.getData();
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

                    <li class="li-price">
                        ${this.getPriceLiteralTemplate()}
                    </li>

                    <button class="button-search">조회</button>
                </ul>
            </div>
        `;
    }

    getDateLiteralTemplate() {
        return `
            <label>일자</label>
            <div class="container-price">
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
                <option selected disabled>선택하세요</option>
                <option value="0">선택안함</option>
                ${dataSet 
                    ? dataSet.map((data) => {
                        return `<option value="${data.pk}">${data.name}</option>`;
                    }).join('\n')
                    : 
                    ''}
                ${(label.text === '결제수단') ? `<option value="-1">추가</option>`: ''}
            </select>
        `;
    }

    getPriceLiteralTemplate() {
        return `
            <label>금액</label>
            <div class="container-price">
                <input placeholder="min" /> 
                <div>-</div>
                <input placeholder="max" />
                <div>원<div>
            </div>
        `;
    }

    getContentLiteralTemplate() {
        return `
            <label>내용</label>
            <input placeholder="입력하세요" />
        `;
    }


    setEvent() {
        this.addEvent('click','.button-search', async (e) => {
            e.preventDefault();



            await api('GET', '/home/history/all')


        });
    }
}

