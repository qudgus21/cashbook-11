import './index.scss';
import Component from "../../../core/component";
import api from "../../../utils/api";
import { $ } from '../../../utils/select';
import { addClassSelector, removeClassSelector } from '../../../utils/selectHandler';
import DailyHistory from '../../base/month-history';
import { isEmptyJWTToken } from '../../../utils/result-checker'; // TODO
import Filter from '../filter';

export default class Content extends Component {

    setup () {
        this.state = {};
    }
    
    template (): string { 
        return `
            <div class="container-filter">안녕하세요 누구신가요? </div>
            <div class="wrapper-month-history"></div>
        `;
    }

    mounted () {
        // TODO
        if (isEmptyJWTToken()) { 
            addClassSelector($('.container-filter').get(), 'hidden');
            $('.wrapper-month-history').get().innerHTML = this.getLoginImgTemplate();
        } else {
            new Filter($('.container-filter').get());
            new DailyHistory($('.wrapper-month-history').get());
        }
    }

    getLoginImgTemplate() {
        return `
        <div class="wrapper-img-login"> 
            <img src="../../../src/assets/baedal.jpg" class="img-baedal" /> 
            <div class= "footer"> 로그인을 먼저 하겠어! </div>
        </div>
        `;
    }


    setEvent() {
        this.addEvent('click','.button-user', (e) => {
            e.preventDefault();

            removeClassSelector($('.modal').get(), 'hidden');
        });
    }
}

