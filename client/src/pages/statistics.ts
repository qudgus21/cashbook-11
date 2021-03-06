import Donut from "../components/statistics/donut-chart";
import Component from "../core/component";
import { $ } from "../utils/select";
import '@components/statistics/index.scss'

export default class Statistics extends Component {
    
    template (): string { 
        return ` 
            <div class="container-statistics">
                <div class="wrapper-left">
                    <div class="wrapper-donut"></div>
                    <div class="wrapper-line"></div>
                </div>
                <div class="wrapper-history"></div>
            </div>
        `
    }

    mounted() {
        new Donut($('.container-statistics .wrapper-donut').get());
    }

    setEvent(){
        window.addEventListener('scroll', (e) => {
            if ($('.container-statistics').get()) { 
                if (window.pageYOffset > 1) {
                    $('.container-statistics').get().style.zIndex = 0;
                } else { 
                    $('.container-statistics').get().style.zIndex = 1;
                }
            }
        })
    }
}