import Component from "@core/component";
import { $ } from "@utils/select";

export default class NotFound extends Component {
    
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
    setEvent() {}

}