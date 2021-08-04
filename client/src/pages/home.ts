import Component from "@core/component";
import Content from "@components/home/content";
import SearchBar from "@components/home/searchbar";
import { $ } from "@utils/select";

export default class Home extends Component {
    
    setup () {
        this.state = {
            history
        }
    }

    
    template (): string { 
        return ` 
            <div class="wrapper-searchbar"></div>
            <div class="wrapper-content"></div>
        `
    }

    mounted () {
        new SearchBar($('.wrapper-searchbar').get());
        new Content($('.wrapper-content').get());
    }

    setEvent(){

    }

}