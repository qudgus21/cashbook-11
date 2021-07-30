import Component from "../core/component";
import Daybar from "../components/calandar/daybar";
import Content from "../components/calandar/content";
import "../components/calandar/index.scss";

import { $ } from "../utils/select";

export default class Calendar extends Component {
    
    setup () {
        this.state = {}
    }
    
    template (): string { 
        return ` 
            <div class="container-calendar">
                <div class="wrapper-daybar"></div>
                <div class="wrapper-content"></div>
                <div class="wrapper-footer"></div>
            </div>
        `
    }

    mounted() {
        new Daybar($('.container-calendar .wrapper-daybar').get())
        new Content($('.container-calendar .wrapper-content').get())
    }

    setEvent(){

    }

}