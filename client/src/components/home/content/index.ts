import './index.scss';
import Component from "../../../core/component";
import api from "../../../utils/api";
import { $ } from '../../../utils/select';
import { addClassSelector, removeClassSelector } from '../../../utils/selectHandler';
import Filter from '../filter';
import { checkLogin } from '../../../utils/cookie';
import { dateStore } from '../../../models';
import MonthHistory from '../../base/month-history';
export default class Content extends Component {

    setup () {
        
        this.state = {};
        dateStore.subscribe(this.update.bind(this));
    }

    update() {
        this.setState();
    }

    render() {
        super.render();
    }


    
    setState(historys?:object) {
        this.state.historys = historys ?? dateStore.getHistorys();
        this.render();
    }

    template (): string { 
        return `
            <div class="container-filter">안녕하세요 누구신가요? </div>
            <div class="wrapper-month-history"></div>
        `;
    }

    mounted () {
        // TODO
        if (!checkLogin(false)) { 
            addClassSelector($('.container-filter').get(), 'hidden');
            $('.wrapper-month-history').get().innerHTML = this.getLoginImgTemplate();
        } else {
            new Filter(
                $('.container-filter').get(), 
                { historys : this.state.historys }
            );
            new MonthHistory(
                $('.wrapper-month-history').get(), 
                { historys: this.state.historys } 
            );
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

