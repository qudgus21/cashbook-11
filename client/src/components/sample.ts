import Component from "@core/component";

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
        // 자식 컴포넌트가 있을 때, new 를 하기 위함
        const $element = document.querySelector('.className');
    }

    setEvent(){

    }

}