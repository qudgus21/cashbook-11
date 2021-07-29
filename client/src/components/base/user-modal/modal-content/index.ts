import './index.scss';
import Component from "../../../../core/component";
import api from "../../../../utils/api";
import { $ } from '../../../../utils/select';
import { addClassSelector } from '../../../../utils/selectHandler';

export default class ModalContent extends Component {

    setup () {
        this.state = { isSignInForm : true };
    }
    
    template (): string { 
        return this.state.isSignInForm 
        ? this.signInTemplate()
        : this.signUpTemplate();
    }

    mounted () {}

    signInTemplate() {
        return `
            <form class="form">
                <label for="id">아이디</label>
                <input type="text" name="id" class="input-id" placeholder="아이디를 입력하세요"/>
                <label for="password">비밀번호</label>
                <input type="password" name="password" class="input-password" placeholder="비밀번호를 입력하세요"/>
            </form>
            <button class="button-signin">로그인</button>
            <button class="button-move-signup">회원가입 하러가기</button>
        `;
    }

    signUpTemplate() {
        return `
            <form class="form">
                <label for="id">아이디</label>
                <input type="text" name="id" class="input-id" placeholder="아이디를 입력하세요"/>
                <label for="password">비밀번호</label>
                <input type="password" name="password" class="input-password" placeholder="비밀번호를 입력하세요"/>
            </form>
            <button class="button-signup">회원가입</button>
        `;
    }

    setEvent() {
        this.addEvent('click','.modal .modal-background', (e) => {
            e.preventDefault();
            addClassSelector($('.modal').get(), 'hidden');
        });

        this.addEvent('click','.button-signin', async (e) => {
            e.preventDefault();
            console.log('로그인 버튼 클릭!');

            const { id, password } = this.getIdAndPasswordFromInput();

            const response = await api('POST', '/user/signin', { id, password });
            
            if (response.isFail) {
                /* 스낵바를 띄워야 합니다. */
                alert(response.message);
            } else {
                alert(response.message);
            }
        });

        this.addEvent('click','.button-signup', async (e) => {
            e.preventDefault();
            console.log('회원가입 버튼 클릭!');

            const { id, password } = this.getIdAndPasswordFromInput();

            const response = await api('POST', '/user/signup', { id, password });
            
            if (response.isFail) {
                /* 스낵바를 띄워야 합니다. */
                console.error(response.message);
            } else {
                this.setState({ isSignInForm : true });
            }
        });

        this.addEvent('click','.button-move-signup', async (e) => {
            e.preventDefault();
            
            this.setState({ isSignInForm : false });
        });
    }

    getIdAndPasswordFromInput() {
        const id = $('.form .input-id').get().value;
        const password = $('.form .input-password').get().value;
        return { id, password }; 
    }
}

