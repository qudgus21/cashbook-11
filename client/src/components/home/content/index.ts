import './index.scss';
import Component from "../../../core/component";
import api from "../../../utils/api";
import { $ } from '../../../utils/select';
import { removeClassSelector } from '../../../utils/selectHandler';

export default class Content extends Component {

    setup () {
        this.state = {};
    }
    
    template (): string { 
        return `

        `;
    }

    mounted () {

    }

    setEvent() {
        this.addEvent('click','.button-user', (e) => {
            e.preventDefault();

            removeClassSelector($('.modal').get(), 'hidden');
        });
    }
}

