import './reset.scss';
import './index.scss';
import Appbar from "./components/base/appbar";
import Fab from "./components/base/fab";
import { router } from './core/router';
import { $ } from './utils/select';

window.addEventListener('load', router);

const appbar = new Appbar($('.appbar').get());
new Fab($('.fab').get());

window.addEventListener('popstate', () => {
    router();
    appbar.currentPageImg(history.state.url.split('/').pop());
});

