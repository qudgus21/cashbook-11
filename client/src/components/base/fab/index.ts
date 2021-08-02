import './index.scss';
import Component from "../../../core/component";
import api from "../../../utils/api";
import { $ } from '../../../utils/select';
import { addClassSelector, removeClassSelector } from '../../../utils/selectHandler';
import { addModal } from '../../../utils/modal';
import { checkLogin } from '../../../utils/cookie';

export default class Fab extends Component {

    setup () {
        this.state = {};
    }
    
    template (): string { 
        return`
            <div class="container-fab">
                <button class="button button-user">
                    ${checkLogin() ? 
                    `<img src="../../../src/assets/on-off-button.svg"/>` :
                    `<img src="../../../src/assets/account.svg"/>`}
                </button>
                <button class="button button-write">
                    <img src="../../../src/assets/add_white.svg"/>
                </button>
            </div>
        `;
    }

    mounted () {

    }

    async updateUser() { 
        const response: any = await api('GET', '/user/update/1');
    }

    setEvent() {
        this.addEvent('click','.button-user', (e) => {
            e.preventDefault();
            addModal();
        });

        this.addEvent('click','.button-write', (e) => {
            e.preventDefault();
            if (typeof $('.wrapper-add-history').get() !== 'undefined') {
                removeClassSelector($('.wrapper-add-history').get(), 'wrapper-add-history-hidden');
            }
        });
    }
}

