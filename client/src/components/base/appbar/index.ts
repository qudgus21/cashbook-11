import Component from "../../../core/component";
import { navigateTo } from "../../../core/router";
import { dateStore, filterStore } from "../../../models";
import Snackbar from "../snackbar";
import { $ } from "../../../utils/select"
import './index.scss';
import { checkLogin } from "../../../utils/cookie";
import { addClassSelector, removeClassSelector } from "../../../utils/selectHandler";


export default class Appbar extends Component {
    
    setup() {
        dateStore.fixedSubscribe(this.setTitle.bind(this));
    }

    template (): any { 
        return ` 
            <div class="container-appbar">
                <div></div>
                <h1 class="title"><a href="/home" style="color: white; text-decoration: none; cursor: pointer;">우아한 가계부</a></h1>
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
                    <button class="button-home">
                        <img src="../../../src/assets/file-text.svg"/>
                    </button>
                    <button class="button-calendar">
                        <img src="../../../src/assets/chart.svg"/>
                    </button>
                    <button class="button-statistics">
                        <img src="../../../src/assets/calendar.svg"/>
                    </button>
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
        if (location.pathname !== '/home' && !checkLogin(false)) {
            const $imgs = $('.container-appbar .page-controll img').getAll();
            $imgs[0].classList.add('active');
            
        } else { 
            this.currentPageImg();
        }
    }


    moveTo(url: string, mustUser: boolean) { 
        if (mustUser) {
            if (checkLogin(mustUser)) {
                navigateTo(url);
                this.currentPageImg()
            } else {
                return;
            }
        } else { 
            navigateTo(url);
            this.currentPageImg()
        }
    }

    setEvent(){        
        this.addEvent('click', '.button-home', ({ target }) => {
            this.unsubscribeAllStore();
            filterStore.reset();
            removeClassSelector($('.fab-button-write').get(), 'invisible');
            this.moveTo('/home', false);
            
        })

        this.addEvent('click', '.button-calendar', ({ target }) => {
            this.unsubscribeAllStore();
            filterStore.reset();
            addClassSelector ($('.fab-button-write').get(), 'invisible');
            this.moveTo('/calendar', true);
        })

        this.addEvent('click', '.button-statistics', ({ target }) => {
            this.unsubscribeAllStore();
            filterStore.reset();
            addClassSelector ($('.fab-button-write').get(), 'invisible');
            this.moveTo('/statistics', true);
        })

        this.addEvent('click', '.button-prev', ({target})=>{
            dateStore.moveToPreviousMonth();
            filterStore.reset();
        })

        this.addEvent('click', '.button-next', ({target})=>{
            dateStore.moveToNextMonth();
            filterStore.reset();
        })
    }

    unsubscribeAllStore() {
        dateStore.unsubscribeAll();
        filterStore.unsubscribeAll();
    }
}
