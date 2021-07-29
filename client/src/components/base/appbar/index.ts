import Component from "../../../core/component";
import { navigateTo } from "../../../core/router";
import { dateStore } from "../../../models";
import { $ } from "../../../utils/select"
import './index.scss';

export default class Appbar extends Component {
    
    setup() {
        dateStore.subscribe(this.setTitle.bind(this));
    }

    template (): any { 
        return ` 
            <div class="container-appbar">
                <div></div>
                <h1 class="title">우아한 가계부</h1>
                <div class="date-controll">
                    <div class="button-prev">
                        <img src="../../../src/assets/chevron-left.svg"/>
                    </div>
                    <div class="date">
                        <div class="title-month">${dateStore.state.month}월</div>
                        <div class="title-year">${dateStore.state.year}</div>                   
                    </div>
                    <div class="button-next">
                        <img src="../../../src/assets/chevron-right.svg"/>
                    </div>
                </div>
                <div class="page-controll">
                    <div class="button-home">
                        <img src="../../../src/assets/file-text.svg"/>
                    </div>
                    <div class="button-calendar">
                        <img src="../../../src/assets/chart.svg"/>
                    </div>
                    <div class="button-statistics">
                        <img src="../../../src/assets/calendar.svg"/>
                    </div>
                </div>
                <div></div>
            </div>
        `
    }


    setTitle() {
        $('.container-appbar .title-month').get().textContent = `${dateStore.state.month}월`
        $('.container-appbar .title-year').get().textContent = `${dateStore.state.year}`
    }



    currentPageImg(history?: any) {
        const $imgs = $('.container-appbar .page-controll img').getAll();
        $imgs.forEach(img => { img.classList.remove('active') });
        const currentPage = location.pathname.split('/').pop();
        switch (history || currentPage) {
            case 'home':
                $imgs[0].classList.add('active');
                break;
            case 'calendar':
                $imgs[1].classList.add('active');
                break;
            case 'statistics':
                $imgs[2].classList.add('active');
                break;
        }
    }


    mounted() {
        this.currentPageImg()
    }

    setEvent(){        
        this.addEvent('click', '.button-home', ({target})=>{
            navigateTo('/home');
            this.currentPageImg()
        })

        this.addEvent('click', '.button-calendar', ({ target }) => {
            navigateTo('/calendar');
            this.currentPageImg()
        })

        this.addEvent('click', '.button-statistics', ({target})=>{
            navigateTo('/statistics');
            this.currentPageImg()
        })

        this.addEvent('click', '.button-prev', ({target})=>{
            dateStore.moveToPreviousMonth();
            this.render();
        })

        this.addEvent('click', '.button-next', ({target})=>{
            dateStore.moveToNextMonth();
            this.render();
        })
    }

}