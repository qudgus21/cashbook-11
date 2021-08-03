import Snackbar from "../components/base/snackbar";
import { $ } from "../utils/select";

export const setCookie = (key: string, value: string, days: number) => {
    let expireDate: Date = new Date();
    expireDate.setDate(expireDate.getDate() + days);

    let cookieValue: string =
        escape(value) + (days == null ? '' : '; expires=' + expireDate.toUTCString());
    document.cookie = key + '=' + cookieValue;
};

export const getCookie = (key: string): string => {
    let x: string, y: string;
    let val = document.cookie.split(';');

    for (var i = 0; i < val.length; i++) {
        x = val[i].substr(0, val[i].indexOf('='));
        y = val[i].substr(val[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, '');
        if (x == key) {
            return unescape(y);
        }
    }
};


export const checkLogin = (isSnackShown?:Boolean): Boolean => { 
    if (!getCookie('JWT')) {
        if (isSnackShown) { 
            new Snackbar($('.snackbar').get(), { msg: '로그인 해주세요.', duration: 2000, backgroundColor: '#f45552' });
        }
        return false;
    }
    return true;
}