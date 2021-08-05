import { checkLogin } from './utils/cookie';
import './reset.scss';
import './index.scss';
import Appbar from "@components/base/appbar";
import Fab from "@components/base/fab";
import { router } from '@core/router';
import { $ } from '@utils/select';
import Modal from '@components/base/user-modal';
import  Snackbar  from './components/base/snackbar';

const appbar = new Appbar($('.appbar').get());
new Modal($('.modal-user').get(), { appbar });

window.addEventListener('load', ()=> {router(appbar)});

window.addEventListener('popstate', () => {
    if (history.state.url !== '/home' && !checkLogin()) {
        new Snackbar($('.snackbar').get(), { msg: '로그인 해주세요.', backgroundColor: '#f45552', duration: 2000 });
        appbar.routingEventHandler('/home', false)
    } else { 
        appbar.currentPageImg(history.state.url);
        router();
    }
});



