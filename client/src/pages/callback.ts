import { removeModal } from './../utils/modal';
import Component from "../core/component";
import api from "../utils/api";
import { $ } from "../utils/select";
import { navigateTo } from "../core/router";
import { setCookie } from "../utils/cookie";
import Snackbar from "../components/base/snackbar";
import { dateStore } from '../models';

export default class Callback extends Component {
    
    setup () {
        this.state = {
        }
    }

    
    template (): string { 
        return ` 
            <div class="container-callback">
            </div>
        `
    }

    async mounted() {
        const code = location.search.split('=')[1]
        const response = await api('POST', '/oauth/callback', {code})

        if (response.isFail) {
            history.back();
        } else {
            setCookie('JWT', response.JWT, 1);
            new Snackbar($('.snackbar').get(), { msg: '깃허브 로그인에 성공했습니다.', duration: 2000 });
            removeModal();
            dateStore.setup()
            $('.button-user img').get().src = "../../../src/assets/on-off-button.svg"
            navigateTo('/home')
        }
    }
}