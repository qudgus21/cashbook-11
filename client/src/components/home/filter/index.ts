import './index.scss';
import Component from "../../../core/component";
import api from "../../../utils/api";
import { $ } from '../../../utils/select';
import { removeClassSelector } from '../../../utils/selectHandler';

export default class Filter extends Component {

    setup () {
        this.state = this.props;
    }

    
    template (): string { 
        return `
            <div> 전체 내역 ${this.state.numberOfHistory}건<div>
            <div>
            
            </div>
            <div>
            
            </div>
        `;
    }


    setEvent() {
        this.addEvent('click','.button-search', async (e) => {
            e.preventDefault();
        });
    }

    getFilterContainerTemplate() {}
}

