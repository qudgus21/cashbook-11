import Component from "@core/component";
import Daybar from "@components/calendar/daybar";
import Content from "@components/calendar/content";
import "@components/calendar/index.scss";
import { $ } from "@utils/select";
import { addClassSelector, removeClassSelector } from '@utils/selectHandler';
import MinCalendar from "@components/calendar/min-calendar";


export default class Calendar extends Component {
    
    template (): string { 
        return ` 
            <div class="container-calendar">
                <div class="wrapper-daybar"></div>
                <div class="wrapper-content wrapper-content-calendar"></div>
            </div>
        `
    }


        
    calendarResize(e) { 
        if (location.pathname !== '/calendar') return;
        if (matchMedia("screen and (min-width: 900px)").matches) {
            if ($('.container-mini-calendar').get()) { 
                $('.container-calendar').get().innerHTML = `
                    <div class="wrapper-daybar"></div>
                    <div class="wrapper-content wrapper-content-calendar"></div>
                `
                new Daybar($('.container-calendar .wrapper-daybar').get())
                new Content($('.container-calendar .wrapper-content').get())
            }
        } else if (!$('.container-mini-calendar').get()) {
            new MinCalendar($('.container-calendar').get())
        }
    }





    mounted() {
        window.addEventListener('resize', this.calendarResize);
        if (matchMedia("screen and (min-width: 900px)").matches) {
            new Daybar($('.container-calendar .wrapper-daybar').get())
            new Content($('.container-calendar .wrapper-content').get())
        } else { 
            new MinCalendar($('.container-calendar').get())
        }
    }


}