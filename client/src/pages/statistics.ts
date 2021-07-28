import Component from "../core/component";

export default class Statistics extends Component {
    
    setup () {
        this.state = {
            year: 2021,
            month: 7,
        }
    }
    
    template (): string { 
        return ` 
            <div class="container-statistics">
                통계
            </div>
        `
    }

    mounted () {
        
    }

    setEvent(){

    }

}