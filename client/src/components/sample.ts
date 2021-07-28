import Component from "../core/component";

export default class SampleName extends Component {

    setup () {
        this.state = {};
    }
    
    template (): string { 
        return
        ` 
            <div class="className"></div>
        `
    }

    mounted () {
        const $element = document.querySelector('.className');
    }

    setEvent(){

    }

}