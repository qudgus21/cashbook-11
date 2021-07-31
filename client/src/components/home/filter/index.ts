import './index.scss';
import Component from "../../../core/component";
import api from "../../../utils/api";
import { $ } from '../../../utils/select';
import { removeClassSelector } from '../../../utils/selectHandler';

export default class Filter extends Component {

    setup () {
        this.state = {};
        this.getData();
    }

    async getData() {
       
    }
    
    template (): string { 
        return `
            
        `;
    }


    setEvent() {
        this.addEvent('click','.button-search', async (e) => {
            e.preventDefault();
        });
    }
}

