import Component from "../../../core/component";
import './index.scss';

export default class Line extends Component {

    setup () {
        this.state = {};
    }
    
    template (): string { 
        return` 
            <div class="container-line">
                라인
            </div>
        `
    }

    mounted () {
    }

    setEvent(){

    }

}