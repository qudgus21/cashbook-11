import Component from "../../../core/component";
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
        new Chart($('.wrapper-donut-chart').get())
        new History($('.wrapper-donut-history').get())
    }

    setEvent(){

    }

}