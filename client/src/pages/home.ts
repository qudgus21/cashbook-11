import Component from "../core/component";
import { dateStore } from '../models';
export default class Home extends Component {
    
    setup () {
        this.state = {
            history
        }
        dateStore.subscribe(this.update.bind(this));
    }

    getdata = () => {
        //api => setstate
    }

    update() {
        
        this.render();
    }
    
    template (): string { 
        return ` 
            <div class="container-home">
            </div>
        `
    }

    mounted () {
    }

    setEvent(){

    }

}