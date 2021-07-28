import { TemplateLiteral } from "estree";
import Component from "../../../core/component";
import { navigateTo } from "../../../core/router";
import { dateStore } from "../../../models";
import './index.scss';

export default class Appbar extends Component {
    
    template (): any { 
        return ` 
            <div class="container-appbar">
                <div>우아한 가계부</div>
                    <button 
                        class="button button-prev"
                    >&lt;</button>
                    ${dateStore.state.year}-${dateStore.state.month}
                    <button 
                        class="button button-next"
                    >&gt;</button>
                </div>
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

        this.addEvent('click', '.button-prev', ({target})=>{
            dateStore.moveToPreviousMonth();
            historyStore.changeData(dateStore.state);
            this.render(); // 바뀐 부분만 바꿔주는 것을 반영하면 좋을 것 같다.
        })

        this.addEvent('click', '.button-next', ({target})=>{
            dateStore.moveToNextMonth();
            this.render();
        })
    }

}