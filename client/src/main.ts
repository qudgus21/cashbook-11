import Appbar from "./components/base/appbar";
import Fab from "./components/base/fab";
import { router } from './core/router';

window.addEventListener('load', router);

window.addEventListener('popstate', router);

const $wrapperAppbar: Element = document.querySelector('.appbar');
const $wrapperFab : Element = document.querySelector('.fab');

new Appbar($wrapperAppbar);
new Fab($wrapperFab)