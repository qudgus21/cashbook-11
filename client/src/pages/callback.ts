import { removeModal } from './../utils/modal';
import Component from "../core/component";
import api from "../utils/api";
import { $ } from "../utils/select";
import { navigateTo } from "../core/router";
import { setCookie } from "../utils/cookie";
import Snackbar from "../components/base/snackbar";
import { dateStore } from '@src/models';
import Modal from '@components/base/user-modal';
import { removeClassSelector } from '@utils/selectHandler';
import { img } from '@constants/img-path';

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
            new Modal($('.modal-user').get());
            new Snackbar($('.snackbar').get(), { msg: '깃허브 로그인에 성공했습니다.', duration: 2000 });
            removeModal();
            dateStore.setup()
            removeClassSelector($('.button-container-user').get(), 'animated', 'bounce');
            removeClassSelector($('.button-container-write').get(), 'invisible');
            navigateTo('/home');
            $('.button-container-user img').get().src = img.ON_OFF_BUTTON;
        }
    }
}