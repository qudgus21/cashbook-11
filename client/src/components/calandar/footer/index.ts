
import Component from "../../../core/component";
import './index.scss'

export default class Footer extends Component {
    
    setup () {
        this.state = {

        }
    }
    
    template(): string {
        return ` 
            <div class="container-footer">
                <div>
                    <span>총수입 1, 822, 480</span>&nbsp;&nbsp;
                    <span>총 지출 834,640</span>
                </div>
                <div>${`총계&nbsp; 987,840`}</div>
            </div>
        `
    }

    mounted () {
    }

    setEvent(){

    }

}