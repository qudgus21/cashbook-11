import Appbar from "./components/base/appbar";
import { router } from './core/router';

window.addEventListener('load', router);

window.addEventListener('popstate', router);

let $wrapperAppbar: Element = document.querySelector('.appbar');

new Appbar($wrapperAppbar);
