import './index.scss';
import Component from "../../../core/component";
import api from "../../../utils/api";
import { $ } from '../../../utils/select';
import { removeClassSelector } from '../../../utils/selectHandler';
import DailyHistory from '../../base/daily-history';

export default class Content extends Component {

    setup () {
        this.state = {};
    }
    
    template (): string { 
        return `
            <div class="wrapper-content"></div>
        `;
    }

    mounted () {
        new DailyHistory($('.wrapper-content').get());
    }

    setEvent() {
        this.addEvent('click','.button-user', (e) => {
            e.preventDefault();

            removeClassSelector($('.modal').get(), 'hidden');
        });
    }
}

