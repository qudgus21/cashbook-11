import './index.scss';
import Component from "@core/component";
import { $ } from '@utils/select';
import comma from '@utils/comma';
import { dateStore, filterStore } from '@src/models';
import { img } from '@constants/img-path';

export default class Filter extends Component {

    setup () {
        this.state = this.props;
        this.state.length = this.state.historys.length;
        this.state.isIncomeBoxClicked = true;
        this.state.isConsumeBoxClicked = true;
        this.calculateTotalPrice(this.state.historys);
    }
    
    template (): string { 
        return `
            <div class="text-num-of-historys fadein"
            style="animation-delay: 0.05s;"> 
                전체 내역 ${this.state.length}건
            </div>
            <div class="container-checkbox">
                <div class="custom-checkbox fadein"
                style="animation-delay: 0.25s;">
                    <label>
                        <div class="checkbox checkbox-income">
                            <img src="${img.CHECK_WHITE}" class="img-income-checkbox" />
                        </div>
                    </label>
                    <input type="checkbox" class="hidden"></input>
                    <div class="text-total-income">수입 ${comma(this.state.income)}</div>
                </div>
                <div class="div-space-layout"></div>
                <div class="custom-checkbox fadein"
                style="animation-delay: 0.45s;">
                    <label>
                        <div class="checkbox checkbox-consume">
                            <img src="${img.CHECK_WHITE}" class="img-consume-checkbox" />
                        </div>
                    </label>
                    <input type="checkbox" class="hidden"> </input>
                    <div class="text-total-consume">지출 ${comma(this.state.consume)}</div>
                </div>
            </div>
        `;
    }

    mounted() {
        if (filterStore.state.isIncomeBoxClicked) {
            $('.checkbox-income').get().style.backgroundColor = '#2AC0BC'; 
            $('.img-income-checkbox').get().src = img.CHECK_WHITE;
        }

        if (filterStore.state.isConsumeBoxClicked) {
            $('.checkbox-consume').get().style.backgroundColor = '#2AC0BC';
            $('.img-consume-checkbox').get().src = img.CHECK_WHITE;
        }
    }

    changeNumberOfHistorys(length) {
        this.state.length = length;
        $('.text-num-of-historys').get().innerText = `전체 내역 ${this.state.length}건`;
    }

    setEvent() {
        this.addEvent('click','.checkbox-income', (e) => {
            e.preventDefault();

            this.customCheckboxClickEventHandler(
                $('.checkbox-income').get(),
                $('.img-income-checkbox').get(),
                true
            );
        });

        this.addEvent('click','.text-total-income', (e) => {
            e.preventDefault();

            this.customCheckboxClickEventHandler(
                $('.checkbox-income').get(),
                $('.img-income-checkbox').get(),
                true
            );
        });

        this.addEvent('click','.checkbox-consume', (e) => {
            e.preventDefault();
            
            this.customCheckboxClickEventHandler(
                $('.checkbox-consume').get(),
                $('.img-consume-checkbox').get(),
                false
            );
        });

        this.addEvent('click','.text-total-consume', (e) => {
            e.preventDefault();
            
            this.customCheckboxClickEventHandler(
                $('.checkbox-consume').get(),
                $('.img-consume-checkbox').get(),
                false
            );
        });
    }

    customCheckboxClickEventHandler(
        $checkbox: HTMLElement, 
        $img: HTMLImageElement, 
        isIncome: boolean
    ) {
        let booleanValue;

        if (isIncome) {
            booleanValue = !this.state.isIncomeBoxClicked;
            this.state.isIncomeBoxClicked = booleanValue;
        } else {
            booleanValue = !this.state.isConsumeBoxClicked;
            this.state.isConsumeBoxClicked = booleanValue;
        }   

        $checkbox.style.backgroundColor = booleanValue ? '#2AC0BC' : 'transparent';
        $img.src = booleanValue ? img.CHECK_WHITE: img.CHECK_PRIMARY;
        
        this.filteringShownData();
    }

    filteringShownData() {
        filterStore.setState({ 
            isIncomeBoxClicked: this.state.isIncomeBoxClicked,
            isConsumeBoxClicked: this.state.isConsumeBoxClicked,
            categorys: -1,
            delay: 0,
        });
    }

    calculateTotalPrice(historys) {
        let consume = 0;
        let income = 0;
        
        historys.forEach(h => {
            if (isConsumeHistory(h)) {
                consume += h.value;
            } else {
                income += h.value;
            }
        });
    
        this.state.consume = consume;
        this.state.income = income;
    }

    changeTotalValues(historys) {
        this.calculateTotalPrice(historys);
        $('.text-total-income').get().innerHTML = ` 수입 ${comma(this.state.income)}`;
        $('.text-total-consume').get().innerHTML = ` 지출 ${comma(this.state.consume)}`;
    }
}

const isConsumeHistory = (h: any): boolean => h.status == -1;
