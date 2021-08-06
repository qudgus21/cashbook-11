import  api  from '@utils/api';
import { getDateInfo } from './../../../utils/util-func';
import { addClassSelector, removeClassSelector } from '@utils/selectHandler';
import { category } from '@constants/category';
import { checkLogin } from '@utils/cookie';
import { isEmpty } from '@utils/util-func';
import Component from "@core/component";
import './index.scss';
import { dateStore, filterStore } from '@src/models';
import { $ } from '@utils/select';
import Filter from '@components/home/content/filter';
import MonthHistory from '@components/base/month-history';

export default class CategoryHistory extends Component {
    $monthHistory:MonthHistory;
    $filter: Filter;


    setup() {
        this.state = {};
        this.state = { dayArray: null, historys: null };
        this.filteringHistory();
        dateStore.subscribe(this.update.bind(this));
        filterStore.subscribe(this.partialRender.bind(this));
    }

    
    update() {
        this.setState();
    }

    
    template (): string { 
        return` 
            <div class="container-history">

            </div>
        `
    }



    async mounted() {
        addClassSelector($('.container-history').get(), 'fadein')

        setTimeout(() => {
            removeClassSelector($('.container-history').get(), 'fadein')
        }, 1600);
  


        if (checkLogin(false)) { 
            const response = await api('GET', `/statistics/paytrend?month=${dateStore.state.month}&year=${dateStore.state.year}`)
            if (response.isFail) return;
            if (response.payTrends.length > 0) { 
                this.$monthHistory = new MonthHistory(
                    $('.container-history').get(), 
                    {
                        dayArray: this.state.dayArray,
                        historys: this.state.historysObj,
                    }
                );
            }
        }
    }


    setEvent(){

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
    }


    filteringHistory() {//1번
        let historys = dateStore.getHistorys();//현재 날짜(무조건 8월 데이터가 날아옴)
        filterStore.state.categorys = this.props.categoryPK;
        this.state.historys = historys.filter(h => {

            if (filterStore.state.categorys !== -1) {
                return h.CategoryPk == filterStore.state.categorys;
            }
            if (!filterStore.state.isIncomeBoxClicked && h.status === 1) return false;
            else if (!filterStore.state.isConsumeBoxClicked && h.status === -1) return false;

            return true;
        });
        this.convertHistorysToHandyObject();
        this.state.dayArray = this.getDayArray();
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
        return Object.keys(this.state.historysObj).sort((a: any,b: any):any => b-a);
    }




}