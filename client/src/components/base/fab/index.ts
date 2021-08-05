import './index.scss';
import Component from "@core/component";
import api from "@utils/api";
import { $ } from '@utils/select';
import { addClassSelector, removeClassSelector } from '@utils/selectHandler';
import { addModal } from '@utils/modal';
import { checkLogin } from '@utils/cookie';
import { img } from '@constants/img-path';

export default class Fab extends Component {

    state: {isAddHistoryOn: boolean };
    setup () {
        this.state = { isAddHistoryOn: false };
    }
    
    template (): string { 
        return`
            <div class="container-fab">
                ${!checkLogin() || location.pathname !== '/home' ? 
                    `<button class="button fab-button-write invisible">
                        <img src="${img.ADD_WHITE}"/>
                    </button>`
                    :
                    `<button class="button fab-button-write">
                        <img src="${img.ADD_WHITE}"/>
                    </button>
                    `
                }
            </div>
        `;
    }

    setEvent() {
        this.addEvent('click','.fab-button-write', (e) => {
            e.preventDefault();
            if (!this.state.isAddHistoryOn) {
                if (typeof $('.wrapper-add-history').get() !== 'undefined') {
                    removeClassSelector($('.wrapper-add-history').get(), 'wrapper-add-history-hidden');
                }
            } else {
                if (typeof $('.wrapper-add-history').get() !== 'undefined') {
                    addClassSelector($('.wrapper-add-history').get(), 'wrapper-add-history-hidden');
                }
            }
        });
    }
}