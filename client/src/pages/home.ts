import Component from "../core/component";

export default class Home extends Component {
    
    setup () {
        this.state = {
            year: 2021,
            month: 7,
        }
    }
    
    template (): string { 
        return ` 
            <div class="container-home">
                홈
            </div>
        `
    }

    mounted () {
    }

    setEvent(){

    }

}