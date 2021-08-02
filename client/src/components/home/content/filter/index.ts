import './index.scss';
import Component from "../../../../core/component";
import api from "../../../../utils/api";
import { $ } from '../../../../utils/select';
import { removeClassSelector } from '../../../../utils/selectHandler';
import comma from '../../../../utils/comma';
import { filterStore } from '../../../../models';

export default class Filter extends Component {

    setup () {
        this.state = this.props;
        this.state.length = this.state.historys.length;
        this.state.isIncomeBoxClicked = true;
        this.state.isConsumeBoxClicked = true;
        this.calculateTotalPrice();
    }
    
    template (): string { 
        return `
            <div class="text-num-of-historys"> 
                전체 내역 ${this.state.length}건
            </div>
            <div class="container-checkbox">
                <div class="custom-checkbox">
                    <label>
                        <div class="checkbox checkbox-income">
                            <img src="src/assets/check-white.svg" class="img-income-checkbox" />
                        </div>
                    </label>
                    <input type="checkbox" class="hidden"> 수입 ${comma(this.state.income)}</input>
                </div>
                <div class="div-space-layout"></div>
                <div class="custom-checkbox">
                    <label>
                        <div class="checkbox checkbox-consume">
                            <img src="src/assets/check-white.svg" class="img-consume-checkbox" />
                        </div>
                    </label>
                    <input type="checkbox" class="hidden"> 지출 ${comma(this.state.consume)}</input>
                </div>
            </div>
        `;
    }

    mounted() {
        if (filterStore.state.isIncomeBoxClicked) {
            $('.checkbox-income').get().style.backgroundColor = '#2AC0BC';
            $('.img-income-checkbox').get().src = 'src/assets/check-white.svg';
        }

        if (filterStore.state.isConsumeBoxClicked) {
            $('.checkbox-consume').get().style.backgroundColor = '#2AC0BC';
            $('.img-consume-checkbox').get().src = 'src/assets/check-white.svg';
        }
    }

    changeNumberOfHistorys(length) {
        this.state.length = length;
        $('.text-num-of-historys').get().innerText = `전체 내역 ${this.state.length}건`;
    }

    setEvent() {
        this.addEvent('click','.checkbox-income', async (e) => {
            e.preventDefault();

            this.customCheckboxClickEventHandler(
                $('.checkbox-income').get(),
                $('.img-income-checkbox').get(),
                true
            );
        });

        this.addEvent('click','.checkbox-consume', async (e) => {
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
        $img.src = 'src/assets/' + (booleanValue ? 'check-white.svg': 'check-primary.svg');
        
        this.filteringShownData();
    }

    filteringShownData() {
        filterStore.setState({ 
            isIncomeBoxClicked: this.state.isIncomeBoxClicked,
            isConsumeBoxClicked: this.state.isConsumeBoxClicked,
            categorys: -1,
        });
    }

    calculateTotalPrice() {
        let consume = 0;
        let income = 0;
        
        this.state.historys.forEach(h => {
            if (isConsumeHistory(h)) {
                consume += h.value;
            } else {
                income += h.value;
            }
        });
    
        this.state.consume = consume;
        this.state.income = income;
    }
}

const isConsumeHistory = (h: any): boolean => h.status == -1;
