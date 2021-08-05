import './index.scss';
import Component from "@core/component";
import { $ } from '@utils/select';
import { addClassSelector, removeClassSelector } from '@utils/selectHandler';
import Filter from './filter';
import { checkLogin } from '@utils/cookie';
import { dateStore, filterStore } from '@src/models';
import MonthHistory from '@components/base/month-history';
import AddHistory from './add-history';
import { getDateInfo, isEmpty } from '@utils/util-func';
import { SEARCH_HISTORY } from '@models/date-store';
import { category } from '@constants/category';
import { img } from '@constants/img-path';


export default class Content extends Component {
    $monthHistory: MonthHistory;
    $filter: Filter;
    state: { dayArray: any; historys: any; historysObj: any; };

    setup () {
        this.state = { dayArray: null, historys: null, historysObj: null, };
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
            dayArray: [...this.state.dayArray],
            historys: {...this.state.historysObj},
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
            <div 
                class="container-filter fadein"></div>
            <div class="wrapper-add-history wrapper-add-history-hidden"></div>
            <div
                class="wrapper-month-history fadein"
                style="animation-delay:${0.6}s;"></div>
        `;
    }

    mounted () {
        // TODO
        if (!checkLogin(false)) { 
            addClassSelector($('.container-filter').get(), 'hidden');
            $('.wrapper-content').get().innerHTML = this.getLoginImgTemplate();
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
            <!--img src="${img.BAEDAL}" class="img-baedal" /> 
            <div class= "footer"> 로그인을 먼저 하겠어!</div-->
        </div>
        `;
    }

    setEvent() {
        this.addEvent('click','.fab-button-user', (e) => {
            e.preventDefault();

            removeClassSelector($('.modal').get(), 'hidden');
        });
    }

    convertHistorysToHandyObject() {
        if (!isEmpty(this.state.historys)) {
            this.state.historys = this.state.historys.map((h: any) => {
                const date = new Date(h.time);
                h = { ...h, ...getDateInfo(h.time)};
                h.time = `${date.getHours()}:${date.getMinutes()}`;
                return h;
            });

            const historysObj = {};

            this.state.historys.forEach((h: any)=> {
                if (isEmpty(historysObj[`${h.year}-${h.month}-${h.date}`])) {
                    historysObj[`${h.year}-${h.month}-${h.date}`] = [h];
                } else {
                    historysObj[`${h.year}-${h.month}-${h.date}`].push(h);
                }
            });

            this.state.historysObj = historysObj;
        }
    }

    getDayArray() {
        if (isEmpty(this.state.historys)) return [];
        // 성능을 잡아먹는것 같다. 객체를 매번 생성하기 때문에... 시간의 역순으로 구현하였다.
        return Object.keys(this.state.historysObj).sort((a: any,b: any):any => new Date(b).getTime()- new Date(a).getTime() );
    }

    filteringHistory() {
        let historys = dateStore.getHistorys();
        this.state.historys = historys.filter(h => {
            
            if (filterStore.state.categorys !== category.ALL) {
                return h.CategoryPk == filterStore.state.categorys;
            }

            if (!filterStore.state.isIncomeBoxClicked && h.status === 1) return false;
            else if (!filterStore.state.isConsumeBoxClicked && h.status === -1) return false;
            return true;
        });

        this.convertHistorysToHandyObject();
        this.state.dayArray = this.getDayArray();
    }
}

