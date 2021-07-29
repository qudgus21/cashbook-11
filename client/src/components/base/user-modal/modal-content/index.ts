import './index.scss';
import Component from "../../../../core/component";
import api from "../../../../utils/api";
import { $ } from '../../../../utils/select';
import { addClassSelector } from '../../../../utils/selectHandler';
import { navigateTo } from '../../../../core/router';
import { setCookie } from '../../../../utils/cookie';

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

    signInTemplate(): string {
        return `
            <form class="form signin-form">
                <h1>로그인</h1>
                <label for="id">아이디</label>
                <input type="text" name="id" class="input-id" placeholder="아이디를 입력하세요"/>
                <label for="password">비밀번호</label>
                <input type="password" name="password" class="input-password" placeholder="비밀번호를 입력하세요"/>
            </form>
            <button class="button-signin">로그인</button>
            <button class="button-github">깃허브로그인</button>
            <div class="button-move-signup">회원가입 하러가기</div>
        `;
    }

    signUpTemplate(): string {
        return `
            <form class="form signup-form">
                <h1>회원가입</h1>
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

            const { id, password } = this.getIdAndPasswordFromInput();

            const response: any = await api('POST', '/user/signin', { id, password });
            
            if (response.isFail) {
                alert(response.message);
            } else {
                setCookie('JWT', response.JWT, 1);
                addClassSelector($('.modal').get(), 'hidden');
                alert('로그인에 성공했습니다!');
                navigateTo(window.location.pathname);
            }
        });

        this.addEvent('click','.button-signup', async (e) => {
            e.preventDefault();

            const { id, password } = this.getIdAndPasswordFromInput();
            // const isValid = this.signupValidation(id);

            // if (isValid) {
                const response: any = await api('POST', '/user/signup', { id, password });
            
                if (response.isFail) {
                    /* 스낵바를 띄워야 합니다. */
                    console.error(response.message);
                } else {
                    this.setState({ isSignInForm: true });
                }
            // }
        });

        this.addEvent('click','.button-move-signup', async (e) => {
            e.preventDefault();
            
            this.setState({ isSignInForm : false });
        });
    }


    // signupValidation = (id) => { 
    //     let idReg = /^[A-za-z0-9]{4,12}$/;
    //     if (!idReg.test(id)) {

    //     }

    //     return false;
    // }


    getIdAndPasswordFromInput(): { id: string, password: string } {
        const id: string = $('.form .input-id').get().value;
        const password: string = $('.form .input-password').get().value;

        return { id, password }; 
    }
}

