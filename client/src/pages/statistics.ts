import Donut from "../components/statistics/donut-chart";
import Component from "../core/component";
import { $ } from "../utils/select";
import '../components/statistics/index.scss'

export default class Statistics extends Component {
    
    setup () {
        this.state = {
            year: 2021,
            month: 7,
        }
    }
    
    template (): string { 
        return ` 
            <div class="container-statistics">
                <div class="wrapper-donut"></div>
                <div class="wrapper-line"></div>
                <div class="wrapper-history"></div>
            </div>
        `
    }

    mounted() {
        new Donut($('.container-statistics .wrapper-donut').get());
    }

    setEvent(){

    }

}