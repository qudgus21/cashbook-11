import Component from "../../../core/component";
import { dateStore } from "../../../models";
import { checkLogin } from "../../../utils/cookie";
import { $ } from "../../../utils/select";
import Chart from "./chart";
import History from "./history";

import './index.scss';

export default class Donut extends Component {

    setup () {
        this.state = {};
    }
    
    template (): string { 
        return` 
            <div class="container-donut">
                <div class="wrapper-donut-chart"></div>
                <div class="wrapper-donut-history"></div>
            </div>
        `
    }

    mounted() {
        if (dateStore.getHistorys().length !== 0) {
            new Chart($('.wrapper-donut-chart').get());
            new History($('.wrapper-donut-history').get());
        } else {
            $('.container-donut').get().innerHTML = `
                <div class="wrapper-img-empty"> 
                    <img src="../../../src/assets/baedal.jpg" class="img-empty-statistic" /> 
                </div>
            `;
        }
        
    }

    setEvent(){

    }

}