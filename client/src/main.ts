import { checkLogin } from './utils/cookie';
import './reset.scss';
import './index.scss';
import Appbar from "@components/base/appbar";
import Fab from "@components/base/fab";
import { router } from '@core/router';
import { $ } from '@utils/select';
import Modal from '@components/base/user-modal';
import  Snackbar  from './components/base/snackbar';

window.addEventListener('load', router);

window.addEventListener('popstate', () => {
    if (history.state.url !== '/home' && !checkLogin()) {
        new Snackbar($('.snackbar').get(), { msg: '로그인 해주세요.', backgroundColor: '#f45552', duration: 2000 });
        appbar.routingEventHandler('/home', false)
    } else { 
        appbar.currentPageImg(history.state.url);
        router();
    }
});

// window.addEventListener('resize', (e) => {
//     const currentPage = location.pathname
//     const width = window.innerWidth;
//     switch (currentPage) { 
//         case '/home':
//             if (width < 975) {
                
//                 alert('안돼')
//             }
//             break;
//         case '/calendar':
//             if (width < 655) { 
//                 alert('안돼')
//             }
//             break;
//         case '/statistics':
//             if (width < 700) { 
//                 alert('안돼')
//             }
//             break;
//     }
//     console.log(window.innerWidth)
// });


const appbar = new Appbar($('.appbar').get());
new Modal($('.modal-user').get(), { appbar });

