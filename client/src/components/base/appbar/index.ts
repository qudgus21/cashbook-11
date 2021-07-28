import { TemplateLiteral } from "estree";
import Component from "../../../core/component";
import { navigateTo } from "../../../core/router";
import './index.scss';

export default class Appbar extends Component {
    
    setup () {
        this.state = {
            year: 2021,
            month: 7,
        }
    }
    
    template (): any { 
        return ` 
            <div class="container-appbar">
                <div>우아한 가계부</div>
                <div>2021-7</div>
                <div>
                    <button 
                        class="button button-home"
                        data-index-number="0"
                    >홈</button>
                    <button 
                        class="button button-calendar"
                        data-index-number="1"
                    >달력</button>
                    <button 
                        class="button button-statistics"
                        data-index-number="2"
                    >통계</button>
                </div>
            </div>
        `
    }

    mounted () {
        const wrapperAppbar = document.querySelector('.wrapper-appbar');
    }

    setEvent(){        
        this.addEvent('click', '.button-home', ({target})=>{
            navigateTo('/home');
        })

        this.addEvent('click', '.button-calendar', ({target})=>{
            navigateTo('/calendar');
        })

        this.addEvent('click', '.button-statistics', ({target})=>{
            navigateTo('/statistics');
        })
    }

}