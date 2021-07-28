import Component from "../core/component";

export default class Calendar extends Component {
    
    setup () {
        this.state = {
            year: 2021,
            month: 7,
        }
    }
    
    template (): string { 
        return ` 
            <div class="container-calendar">
                달력
            </div>
        `
    }

    mounted () {
    }

    setEvent(){

    }

}