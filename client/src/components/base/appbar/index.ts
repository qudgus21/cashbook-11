import Component from "@src/core/component";
import { navigateTo } from "@core/router";
import { dateStore, filterStore } from "@src/models";
import { $ } from "@utils/select"
import './index.scss';
import { checkLogin } from "@utils/cookie";
import { addClassSelector, removeClassSelector } from "@utils/selectHandler";
import { img } from "@constants/img-path";
import { addModal } from "@utils/modal";
import { isEmpty } from "@utils/util-func";


export default class Appbar extends Component {

    setup() {
        dateStore.fixedSubscribe(this.setTitle.bind(this));
    }

    setTitle() {
        $('.container-date-control .text-now-month').get().textContent = `${dateStore.state.month}월`
        $('.container-date-control .text-now-year').get().textContent = `${dateStore.state.year}`
        $('.text.user-text').get().innerHTML = !checkLogin()? 'LOGIN': 'LOGOUT';
    }

    template (): any { 
        return ` 
            <nav class="container-nav">
                <h1 class="button-container title">
                    <a href="/home">우아한 가계부</a>
                </h1>    
                <div class="nav-button-container nav-button-home">
                    <button class="button-home">
                        <img src="${img.FILE_TEXT}"/>
                    </button>
                    <div class="text">HOME</div>
                </div>
                <div class="nav-button-container nav-button-calendar">
                    <button class="button-calendar">
                        <img src="${img.CHART}"/>
                    </button>
                    <div class="text">CALENDAR</div>
                </div>
                <div class="nav-button-container nav-button-statistics">
                    <button class="button-statistics">
                        <img src="${img.CALENDAR}"/>
                    </button>
                    <div class="text">STATISTICS</div>
                </div>
            </nav>

            <div class="container-date-control">
                <div class="button-prev-month">
                    <img src="${img.CHEVRON_LEFT}"/>
                </div>
                <div class="date">
                    <div class="text-now-month">${dateStore.state.month}월</div>
                    <div class="text-now-year">${dateStore.state.year}</div>                   
                </div>
                <div class="button-next-month">
                    <img src="${img.CHEVRON_RIGHT}"/>
                </div>
            </div>

            <div class="container-fab-button">
                <div class="button-container button-container-write">
                    <button class="button button-write${!checkLogin() || location.pathname !== '/home' ? 'invisible': ''}">
                        <img src="${img.ADD_WHITE}"/>
                    </button>
                    <div class="text">ADD HISTORY</div>
                </div>
                <div class="button-container button-container-user ${!checkLogin() ? "animated bounce": ""}">
                    <button class="button button-user">
                        <img src="${!checkLogin()? img.ACCOUNT : img.ON_OFF_BUTTON}"/>
                    </button>
                    <div class="text user-text">${!checkLogin()? 'LOGIN': 'LOGOUT'}</div>
                </div>
            </div>
        `;
    }


    mounted() {
        if (location.pathname !== '/home' && !checkLogin(false)) {
            const $navContainers = $('.appbar .container-nav .nav-button-container').getAll();
            $navContainers[0].classList.add('active');
        } else { 
            this.currentPageImg();
        }
    }


    setEvent(){        
        this.addEvent('click', '.nav-button-home', () => {
            this.routingEventHandler('/home', false);
        });

        this.addEvent('click', '.nav-button-calendar', () => {
            this.routingEventHandler('/calendar', true);
        });

        this.addEvent('click', '.nav-button-statistics', () => {
            this.routingEventHandler('/statistics', true);
        });

        this.addEvent('click', '.button-prev-month', () => {
            dateStore.moveToPreviousMonth();
            filterStore.reset();
        });

        this.addEvent('click', '.button-next-month', () => {
            dateStore.moveToNextMonth();
            filterStore.reset();
        });

        this.addEvent('click', '.button-container-user', addModal);

        this.addEvent('click', '.button-container-write', () => {
            const $element = $('.wrapper-add-history').get();
            console.log("일단 눌림 ...");
            if (!isEmpty($element)) {
                console.log("?");
                removeClassSelector($element, 'wrapper-add-history-hidden');
            } else {
                console.log('...?');
            }
        })
    }


    currentPageImg(history?: any) {
        const $navContainers = $('.appbar .container-nav .nav-button-container').getAll();
        $navContainers.forEach($navContainer => { $navContainer.classList.remove('active') });
        const currentPage = location.pathname.split('/').pop();
        switch (history || currentPage) {
            case 'home':
                $navContainers[0].classList.add('active');
                break;
            case 'calendar':
                $navContainers[1].classList.add('active');
                break;
            case 'statistics':
                $navContainers[2].classList.add('active');
                break;
        }
    }


    moveTo(url: string, mustUser: boolean) { 
        if (mustUser) {
            if (checkLogin(mustUser)) {
                this.unsubscribeAllStore();
                filterStore.reset();
                navigateTo(url);
                this.currentPageImg()
                return true;
            } else {
                return false;
            }
        } else { 
            this.unsubscribeAllStore();
            filterStore.reset();
            navigateTo(url);
            this.currentPageImg()
            return true;
        }
    }


    unsubscribeAllStore() {
        dateStore.unsubscribeAll();
        filterStore.unsubscribeAll();
    }


    routingEventHandler = async (nextUrl, doPageNeedToLogin) => {
        const $target = $('.app .container-content').get();
        
        if ($target.classList.contains('move-down')) return;

        if (!this.moveTo(nextUrl, doPageNeedToLogin)) return;

        $target.classList.add('move-down');
        
        setTimeout(() => {
            console.log('1초후');
            
            if (nextUrl === '/home' && !doPageNeedToLogin) {
                removeClassSelector($('.button-container-write').get(), 'invisible');
            } else {
                addClassSelector ($('.button-container-write').get(), 'invisible');
            }

            // this.moveTo(nextUrl, doPageNeedToLogin);
            $target.classList.add('move-up');
            setTimeout(()=> {
                $target.classList.remove('move-down', 'move-up');
            }, 1000);
        }, 1000)
    }
}