import Component from "../core/component";
import Content from "../components/home/content";
import SearchBar from "../components/home/searchbar";
import { dateStore } from '../models';
import { $ } from "../utils/select";

export default class NotFound extends Component {
    
    setup () {
        this.state = {
            history
        }
    }

    
    template (): string { 
        return ` 
            <div class="container-notfound"></div>
        `
    }

    mounted () {
        $('.container-notfound').get().innerHTML = `
            <div class="wrapper-img-notfound"> 
                누구쎄용?
            </div>
        `;
    }

    setEvent(){

    }

}