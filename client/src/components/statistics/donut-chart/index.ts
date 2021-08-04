import { img } from "@constants/img-path";
import Component from "@core/component";
import { dateStore } from "@src/models";
import { $ } from "@utils/select";
import Chart from "./chart";
import History from "./history";

import './index.scss';

export default class Donut extends Component {

    setup () {
        this.state = {};
        
        dateStore.subscribe(this.mounted.bind(this));
    }
    
    template (): string { 
        return` 
            <div class="container-donut">
            </div>
        `
    }

    mounted() {


        $('.container-donut').get().innerHTML =
        `
            <div class="wrapper-donut-chart"></div>
            <div class="wrapper-donut-history"></div>
        `
        new Chart($('.wrapper-donut-chart').get());
        new History($('.wrapper-donut-history').get());

        // if (dateStore.getHistorys().length !== 0) {

        // } else {
        //     $('.container-donut').get().innerHTML = `
        //         <div class="wrapper-img-empty"> 
        //             <img src="${img.BAEDAL}" class="img-empty-statistic" /> 
        //         </div>
        //     `;
        // }
        
    }

    setEvent(){

    }

}