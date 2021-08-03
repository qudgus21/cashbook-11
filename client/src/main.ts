import './reset.scss';
import './index.scss';
import Appbar from "@components/base/appbar";
import Fab from "@components/base/fab";
import { router } from '@core/router';
import { $ } from '@utils/select';
import Modal from '@components/base/user-modal';

window.addEventListener('load', router);

window.addEventListener('popstate', () => {
    router();
    appbar.currentPageImg(history.state.url.split('/').pop());
});

const appbar = new Appbar($('.appbar').get());
new Fab($('.fab').get());
new Modal($('.modal-user').get());