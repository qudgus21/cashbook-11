import { addClassSelector, removeClassSelector } from '@utils/selectHandler';
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
        addClassSelector($('.container-donut').get(), 'fadein')

        setTimeout(() => {
            removeClassSelector($('.container-donut').get(), 'fadein')
        }, 1300);

        $('.container-donut').get().innerHTML =
        `
            <div class="wrapper-donut-chart"></div>
            <div class="wrapper-donut-history"></div>
        `
        new Chart($('.wrapper-donut-chart').get());
        new History($('.wrapper-donut-history').get());


        
    }

    setEvent(){

    }

}