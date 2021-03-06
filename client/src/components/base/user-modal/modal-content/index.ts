import './index.scss';
import Component from "@core/component";
import api from "@utils/api";
import { $ } from '@utils/select';
import { addClassSelector ,removeClassSelector} from '@utils/selectHandler';
import { navigateTo } from '../../../../core/router';
import { setCookie, checkLogin } from '@utils/cookie';
import Snackbar from "@components/base/snackbar"
import { removeModal } from '@utils/modal';
import { dateStore} from "@src/models";
import { img } from '@constants/img-path';

export default class ModalContent extends Component {
    setup () {
        this.state = {
            isSignInForm: true,
            isSignupId: false,
            isSignupPassword: false,
            isSigninId: false,
            isSigninPassword: false,
        };
    }
    
    template(): string { 
        return checkLogin(false) ? this.logoutTemplate() : this.state.isSignInForm ? this.signInTemplate() : this.signUpTemplate();
    }

    mounted() {
        if (!checkLogin(false)) { 
            this.state.isSignInForm ? this.canSignin() : this.canSignup();
        }
    }


    logoutTemplate(): string { 
        return `
            <div class="modal-logout">
                <div>현재 계정에서 로그이웃 하시겠습니까?</div>
                <div class="buttons-logout">
                    <button id="button-logout-cancel">취소</button>
                    <button id="button-logout-confirm">확인</button>
                </div>
            </div>
        `
    }


    signInTemplate(): string {
        return `
            <form class="form signin-form">
                <h1>로그인</h1>
                <label for="id">아이디 (테스트 아이디: youngwoo)</label>
                <input type="text" name="id" class="input-id" id="input-signin-id" placeholder="아이디를 입력하세요"/>
                <div class="input-alert">4자</div>
                <label for="password">비밀번호 (테스트 비밀번호: qwer223!)</label>
                <input type="password" name="current-password" class="input-password" id="input-signin-password" placeholder="비밀번호를 입력하세요"/>
                <div class="input-alert">4자</div>
            </form>
            <button class="button-signin">로그인</button>
            <a href="https://github.com/login/oauth/authorize?client_id=ac4c75cd733116b5db3b&redirect_uri=http://ec2-15-165-75-122.ap-northeast-2.compute.amazonaws.com/callback"><button id="button-github">깃허브     로그인</button></a>
            <div class="button-move-signup">회원가입 하러가기</div>
        `;
    }

    signUpTemplate(): string {
        return `
            <form class="form signup-form">
                <h1>회원가입</h1>
                <label for="id">아이디</label>
                <input type="text" name="id" class="input-id" id="input-signup-id" placeholder="아이디를 입력하세요"/>
                <div class="input-alert"></div>
                <label for="password">비밀번호</label>
                <input type="password" name="password" class="input-password" id="input-signup-password" placeholder="비밀번호를 입력하세요"/>
                <div class="input-alert"></div>
            </form>
            <button class="button-signup">회원가입</button>
            <div class="button-move-signin">로그인 하러가기</div>
        `;
    }
    
    setEvent() {
        this.addEvent('click','.modal .modal-background', (e) => {
            e.preventDefault();
            removeModal();
        });
        this.addEvent('click','.button-signin', async (e) => {
            e.preventDefault();
            this.signinHandler(e);
        });
        this.addEvent('keyup', '#input-signin-id', (e) => { this.canSignin() });
        this.addEvent('keyup', '#input-signin-password', (e) => { this.canSignin() });
        this.addEvent('click','.button-signup', async (e) => {
            e.preventDefault();
            this.signupHandler(e);
        });
        this.addEvent('keyup', '#input-signup-id', (e) => { this.canSignup() });
        this.addEvent('keyup', '#input-signup-password', (e) => { this.canSignup() });
        this.addEvent('click', '#button-logout-cancel', () => {removeModal();});
        this.addEvent('click', '#button-logout-confirm', () => { this.logout() });
        

        this.addEvent('click','.button-move-signup', async (e) => {
            e.preventDefault();
            this.setState({ isSignInForm : false });
        });


        this.addEvent('click','.button-move-signin', async (e) => {
            e.preventDefault();
            this.setState({ isSignInForm : true });
        });
    }


    async signupHandler(e) { 
        if (this.canSignup()) {
            const { id, password } = this.getIdAndPasswordFromInput();
            const response: any = await api('POST', '/user/signup', { id, password });
            if (response.isFail) {
                new Snackbar($('.snackbar').get(), { msg: response.message, backgroundColor: '#f45552', duration: 2000 });
            } else {
                new Snackbar($('.snackbar').get(), { msg: '회원가입 성공', duration: 2000 });
                this.setState({ isSignInForm: true , isSignupId: false, isSignupPassword : false});
            }
        } else {    
            new Snackbar($('.snackbar').get()  , { msg: '회원가입 요건이 충족되지 않았습니다', duration: 2000, backgroundColor: '#f45552'});
        }
    }



    async signinHandler(e) { 
        if (this.canSignin()) {
            const { id, password } = this.getIdAndPasswordFromInput();
            const response: any = await api('POST', '/user/signin', { id, password });
            if (response.isFail) {
                new Snackbar($('.snackbar').get(), { msg: response.message, duration: 2000 , backgroundColor: '#f45552'});
            } else {
                setCookie('JWT', response.JWT, 1);
                new Snackbar($('.snackbar').get(), { msg: '로그인에 성공했습니다.', duration: 2000 });
                removeModal();
                dateStore.setup()


                let pathName = window.location.pathname
                // navigateTo(window.location.pathname);
                setTimeout(() => {
                    

                    this.props.appbar.routingEventHandler(
                        '/home'
                        , pathName === '/home' ? false : true);
                    this.afterLogin();
                }, 300);

            }
        } else { 
            new Snackbar($('.snackbar').get(), { msg: '아이디와 비밀번호를 입력해주세요', duration: 2000, backgroundColor: '#f45552'});
        }
    }

    logout(): void {


        setCookie('JWT', 'none', 0);

        $('.button-container-user img').get().src = img.ACCOUNT;
        addClassSelector($('.button-container-user').get(), 'animated', 'bounce');

        addClassSelector($('.button-container-write').get(), 'invisible');
        $('.text.user-text').get().innerHTML = !checkLogin()? 'LOGIN': 'LOGOUT';
        removeModal();

        new Snackbar($('.snackbar').get(), { msg: '로그아웃 되었습니다.', duration: 2000 });


        const $btns = $('.appbar .nav-button-container').getAll();
        $btns.forEach(img => { img.classList.remove('active') });
        $btns[0].classList.add('active');


        setTimeout(() => {
            this.props.appbar.routingEventHandler('/home', false);
            this.setState({
                isSignInForm: true
            })
        }, 300);
    }
    

    afterLogin(): void {
        $('.button-container-user img').get().src = img.ON_OFF_BUTTON;
        removeClassSelector($('.button-container-user').get(), 'animated', 'bounce');

        removeClassSelector($('.button-container-write').get(), 'invisible');

        this.setState({
            isSignInForm: true
        })
    }


    signupIdValidation(): void {
        const $idInput = $('#input-signup-id').get(); 
        const idValue = $idInput.value;
        const $idAlert = $idInput.nextElementSibling;
        const idReg = /^[A-za-z0-9]{4,12}$/;
        if (idReg.test(idValue)) {
            this.state.isSignupId = true;
            $idAlert.textContent = ' ';
        } else { 
            this.state.isSignupId = false;
            $idAlert.textContent = '4자 이상 12자 이하의 영문,숫자로 만들어주세요.';
        }
    }


    signupPwdValidation():void {
        const $passwordInput = $('#input-signup-password').get(); 
        const passwordValue = $passwordInput.value;
        const $passwordAlert = $passwordInput.nextElementSibling;
        const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
        if (passwordReg.test(passwordValue)) {
            this.state.isSignupPassword= true;
            $passwordAlert.textContent = ' ';
        } else { 
            this.state.isSignupPassword = false;
            $passwordAlert.textContent = '최소 8자, 문자,숫자,특수문자가 최소 하나씩 포함되게 만들어주세요.'
        }
    }

    
    canSignup(): Boolean  {
        this.signupIdValidation()
        this.signupPwdValidation()
        const { isSignupId, isSignupPassword } = this.state
        if (isSignupId && isSignupPassword) {
            removeClassSelector($('.button-signup').get(), 'yet');
            return true;
        } else { 
            addClassSelector($('.button-signup').get(), 'yet');
            return false;
        }
    }


    signinIdValidation ():void {
        const $idInput = $('#input-signin-id').get(); 
    
        const idValue = $idInput.value;
        const $idAlert = $idInput.nextElementSibling;
        if (idValue) {
            this.state.isSigninId = true;
            $idAlert.textContent = ' ';
        } else { 
            this.state.isSigninId = false;
            $idAlert.textContent = '아이디를 입력해주세요.';
        }
    }


    signinPwdValidation():void {
        const $passwordInput = $('#input-signin-password').get(); 
        const passwordValue = $passwordInput.value;
        const $passwordAlert = $passwordInput.nextElementSibling;
        if (passwordValue) {
            this.state.isSigninPassword= true;
            $passwordAlert.textContent = ' ';
        } else { 
            this.state.isSigninPassword = false;
            $passwordAlert.textContent = '비밀번호를 입력해주세요.'
        }
    }


    canSignin(): Boolean { 
        this.signinIdValidation()
        this.signinPwdValidation()
        const { isSigninId, isSigninPassword } = this.state
        if (isSigninId && isSigninPassword) {
            removeClassSelector($('.button-signin').get(), 'yet');
            return true;
        } else { 
            addClassSelector($('.button-signin').get(), 'yet');
            return false;
        }    
    }

    getIdAndPasswordFromInput(): { id: string, password: string } {
        const id: string = $('.form .input-id').get().value;
        const password: string = $('.form .input-password').get().value;

        return { id, password }; 
    }
}

