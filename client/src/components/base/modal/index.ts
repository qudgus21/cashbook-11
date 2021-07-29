
import './index.scss';
import Component from "../../../core/component";
import api from "../../../utils/api";
import { $ } from '../../../utils/select';
import { addClassSelector } from '../../../utils/selectHandler';

export default class Modal extends Component {

    setup () {
        this.state = {};
    }
    
    template (): string { 
        return `
            <div class="modal hidden">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <form class="form">
                        <label for="id">아이디</label>
                        <input type="text" name="id" class="input-id" placeholder="아이디를 입력하세요"/>
                        <label for="password">비밀번호</label>
                        <input type="password" name="password" class="input-password" placeholder="비밀번호를 입력하세요"/>
                    </form>
                    <button class="button-signup">회원가입</button>
                </div>
            </div>
        `;
    }

    mounted () {

    }

    setEvent() {
        this.addEvent('click','.modal .modal-background', (e) => {
            e.preventDefault();
            addClassSelector($('.modal').get(), 'hidden');
        });

        this.addEvent('click','.button-signup', async (e) => {
            e.preventDefault();

            const id = $('.container-fab .input-id').get().value;
            const password = $('.container-fab .input-password').get().value;

            const response = await api('POST', '/user/signup', { id, password });
            
            if (response.isFail) {
                /* 스낵바를 띄워야 합니다. */
            } else {
                /* 성공했다고 스낵바를 띄웁니다. 뭔가 색깔을 다르게 띄워줘볼까 고민중입니다. */
            }
        });
    }
}

