import './index.scss';
import Component from "@core/component";
import api from "@utils/api";
import { $ } from '@utils/select';
import { removeClassSelector } from '@utils/selectHandler';
import { addModal } from '@utils/modal';
import { checkLogin } from '@utils/cookie';
import { img } from '@constants/img-path';

export default class Fab extends Component {

    setup () {
        this.state = {};
    }
    
    template (): string { 
        return`
            <div class="container-fab">
                ${!checkLogin() || location.pathname !== '/home' ? 
                `<button class="button fab-button-write invisible">
                    <img src="${img.ADD_WHITE}"/>
                </button>
                ` :
                `<button class="button fab-button-write">
                    <img src="${img.ADD_WHITE}"/>
                </button>
                `
                }
                ${!checkLogin()? 
                `
                <button class="button fab-button-user animated bounce">
                    <img src="${img.ACCOUNT}"/>
                </button>` :
                `
                <button class="button fab-button-user">
                    <img src="${img.ON_OFF_BUTTON}"/>
                </button>`
                }
            </div>
        `;
    }

    mounted () {

    }

    async updateUser() { 
        const response: any = await api('GET', '/user/update/1');
    }

    setEvent() {
        this.addEvent('click','.fab-button-user', (e) => {
            e.preventDefault();
            addModal();
        });

        this.addEvent('click','.fab-button-write', (e) => {
            e.preventDefault();
            if (typeof $('.wrapper-add-history').get() !== 'undefined') {
                removeClassSelector($('.wrapper-add-history').get(), 'wrapper-add-history-hidden');
            }
        });
    }
}

