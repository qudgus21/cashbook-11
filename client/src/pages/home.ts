import Component from "../core/component";
import Content from "../components/home/content";
import SearchBar from "../components/home/searchbar";
import { dateStore } from '../models';
import { $ } from "../utils/select";

export default class Home extends Component {
    
    setup () {
        this.state = {
            history
        }

        dateStore.subscribe(this.update.bind(this));
    }

    update() {
        this.render();
    }
    
    template (): string { 
        return ` 
            <div class="container-home">
                <div class="wrapper-searchbar"></div>
                <div class="wrapper-content"></div>
            </div>
        `
    }

    mounted () {
        new SearchBar($('.container-home .wrapper-searchbar').get());
        new Content($('.container-home .wrapper-content').get());
    }

    setEvent(){

    }

}