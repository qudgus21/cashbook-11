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