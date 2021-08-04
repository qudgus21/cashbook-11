import Component from "@core/component";
import Content from "@components/home/content";
import SearchBar from "@components/home/searchbar";
import { $ } from "@utils/select";
import { checkLogin } from "@utils/cookie";

export default class Home extends Component {
    
    setup () {
        this.state = {
            history
        }
    }

    
    template (): string { 
        return ` 
            <div class="wrapper-searchbar ${checkLogin(false) ? '': 'hidden'}"></div>
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