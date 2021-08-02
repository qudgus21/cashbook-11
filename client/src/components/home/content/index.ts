import './index.scss';
import Component from "../../../core/component";
import api from "../../../utils/api";
import { $ } from '../../../utils/select';
import { addClassSelector, removeClassSelector } from '../../../utils/selectHandler';
import Filter from './filter';
import { checkLogin } from '../../../utils/cookie';
import { dateStore, filterStore } from '../../../models';
import MonthHistory from '../../base/month-history';
import AddHistory from './add-history';
import { isEmpty } from '../../../utils/util-func';
import { SEARCH_HISTORY } from '../../../models/date-store';


export default class Content extends Component {
    $monthHistory: MonthHistory;
    $filter: Filter;

    setup () {
        this.state = { dayArray: null, historys: null };
        this.filteringHistory();
        dateStore.subscribe(this.update.bind(this));
        filterStore.subscribe(this.partialRender.bind(this));
    }

    update() {
        this.setState();
    }

    partialRender() {
        this.filteringHistory();
        this.$monthHistory.setState({ 
            dayArray: this.state.dayArray,
            historys: this.state.historysObj,
        });

        let num = 0;

        this.state.dayArray.forEach(x=>{
            num += this.state.historysObj[x].length;
        })
        this.$filter.changeNumberOfHistorys(num);
        if (dateStore.state.type === SEARCH_HISTORY) {
            this.$filter.changeTotalValues(dateStore.state.historys);
        }
    }

    setState() {
        if (dateStore.state.type === SEARCH_HISTORY) {
            this.partialRender();
            return;
        }
        this.filteringHistory();
        this.render();
    }

    template (): string { 
        return `
            <div class="container-filter"></div>
            <div class="wrapper-add-history wrapper-add-history-hidden"></div>
            <div class="wrapper-month-history"></div>
        `;
    }

    mounted () {
        // TODO
        if (!checkLogin(false)) { 
            addClassSelector($('.container-filter').get(), 'hidden');
            $('.wrapper-month-history').get().innerHTML = this.getLoginImgTemplate();
        } else {
            this.$filter = new Filter(
                $('.container-filter').get(), 
                { historys : this.state.historys }
            );
            new AddHistory($('.wrapper-add-history').get());
            this.$monthHistory = new MonthHistory(
                $('.wrapper-month-history').get(), 
                { 
                    dayArray: this.state.dayArray,
                    historys: this.state.historysObj,
                }
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

    convertHistorysToHandyObject() {
        if (!isEmpty(this.state.historys)) {
            this.state.historys = this.state.historys.map((h: any) => {
                let date = new Date(h.time);
                h.month = date.getMonth() + 1;
                h.date = date.getDate();
                h.dayOfWeek = date.getDay();
                h.time = `${date.getHours()}:${date.getMinutes()}`;
                return h;
            });

            const historysObj = {};

            this.state.historys.forEach((h: any)=> {
                if (isEmpty(historysObj[h.date])) {
                    historysObj[h.date] = [h];
                } else {
                    historysObj[h.date].push(h);
                }
            });

            this.state.historysObj = historysObj;
        }
    }

    getDayArray() {
        if (isEmpty(this.state.historys)) return [];
        return Object.keys(this.state.historysObj).sort((a: any,b: any):any => b-a);
    }

    filteringHistory() {
        let historys = dateStore.getHistorys();
        
        this.state.historys = historys.filter(h => {
            if (filterStore.state.categorys !== -1) {
                return h.status === filterStore.state.categorys;
            }

            if (!filterStore.state.isIncomeBoxClicked && h.status === 1) return false;
            else if (!filterStore.state.isConsumeBoxClicked && h.status === -1) return false;

            return true;
        });

        this.convertHistorysToHandyObject();
        this.state.dayArray = this.getDayArray();
    }
}

