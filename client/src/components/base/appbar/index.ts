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
        $('.container-date-control .text-now-month').get().textContent = `${this.makeMonthWithZero(dateStore.state.month)}`
        $('.container-date-control .text-now-year').get().textContent = `${dateStore.state.year}`
        $('.text.user-text').get().innerHTML = !checkLogin()? 'LOGIN': 'LOGOUT';
    }

    template (): any { 
        return ` 
            <nav class="container-nav">
                <h1 class="button-container title title-main">
                    <span>우</span>
                    <span>아</span>
                    <span>한</span>
                    <span>가</span>
                    <span>계</span>
                    <span>부</span>
                </h1>
                <div class="nav-page-move">
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
                </div>
            </nav>

            <div class="container-date-control">
                <div class="button-prev-month">
                    <img src="${img.CHEVRON_LEFT_WHITE}"/>
                </div>
                <div class="flip">
                    <div class="flip-front">
                        <div class="text-now-month">${this.makeMonthWithZero(dateStore.state.month)}</div>
                        <div class="text-now-year">${dateStore.state.year}</div>
                    </div>
                </div>
                <div class="button-next-month">
                    <img src="${img.CHEVRON_RIGHT_WHITE}"/>
                </div>
            </div>

            <div class="container-fab-button">
                <!--<div class="button-container button-container-write">
                    <button class="button button-write${!checkLogin() || location.pathname !== '/home' ? 'invisible': ''}">
                        <img src="${img.ADD_WHITE}"/>
                    </button>
                    <div class="text">ADD HISTORY</div>
                </div>-->
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
            this.currentPageImg(location.pathname);
        }
    }


    setEvent(){        
        this.addEvent('click', '.nav-button-home', () => {
            this.routingEventHandler('/home', false);
        });


        this.addEvent('click', '.title-main', () => {
            this.routingEventHandler('/home', false);
        });


        this.addEvent('click', '.nav-button-calendar', () => {
            this.routingEventHandler('/calendar', true);
        });

        this.addEvent('click', '.nav-button-statistics', () => {
            this.routingEventHandler('/statistics', true);
        });

        this.addEvent('click', '.button-prev-month', () => {
            addClassSelector($('.container-date-control .flip').get(), 'flipdown');
            setTimeout(()=> {
                dateStore.moveToPreviousMonth();
                filterStore.reset();                
                setTimeout(()=> {
                    removeClassSelector($('.container-date-control .flip').get(), 'flipdown');
                },150);
            },150);
        });

        this.addEvent('click', '.button-next-month', () => {
            addClassSelector($('.container-date-control .flip').get(), 'flipup');
            setTimeout(()=> {
                dateStore.moveToNextMonth();
                filterStore.reset();     
                setTimeout(()=> {
                    removeClassSelector($('.container-date-control .flip').get(), 'flipup');
                },150);
            },150);
        });

        this.addEvent('click', '.button-container-user', addModal);

        this.addEvent('click', '.button-container-write', () => {
            const $element = $('.wrapper-add-history').get();
            if (!isEmpty($element)) {
                removeClassSelector($element, 'wrapper-add-history-hidden');
            } 
        });
    }


    currentPageImg(history?: any, url?: string) {
        const $navContainers = $('.appbar .container-nav .nav-button-container').getAll();
        $navContainers.forEach($navContainer => { $navContainer.classList.remove('active') });
        const currentPage = url;
        switch (history || currentPage) {
            case '/home':
                $navContainers[0].classList.add('active');
                break;
            case '/calendar':
                $navContainers[1].classList.add('active');
                break;
            case '/statistics':
                $navContainers[2].classList.add('active');
                break;
        }
    }


    moveTo(url: string, mustUser: boolean) { 
        if (mustUser) {
            if (checkLogin(mustUser)) {
                this.unsubscribeAllStore();
                filterStore.reset();
                setTimeout(()=> {
                    navigateTo(url);
                }, 1000);
                this.currentPageImg(undefined, url)
                return true;
            } else {
                return false;
            }
        } else { 
            this.unsubscribeAllStore();
            filterStore.reset();
            setTimeout(()=> {
                navigateTo(url);
            }, 1000);
            this.currentPageImg(undefined, url)
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
            
            if (nextUrl === '/home' && !doPageNeedToLogin) {
                removeClassSelector($('.button-container-write').get(), 'invisible');
            } else {
                addClassSelector ($('.button-container-write').get(), 'invisible');
            }

            $target.classList.add('move-up');
            setTimeout(()=> {
                $target.classList.remove('move-down', 'move-up');
            }, 1000);
        }, 1000)
    }

    makeMonthWithZero(m) {
        return m < 10 ? `0${m}` : `${m}`;
    }
}