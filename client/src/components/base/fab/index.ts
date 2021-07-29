import './index.scss';
import Component from "../../../core/component";
import api from "../../../utils/api";
import { $ } from '../../../utils/select';
import { removeClassSelector } from '../../../utils/selectHandler';

export default class Fab extends Component {

    setup () {
        this.state = {};
    }
    
    template (): string { 
        return`
            <div class="container-fab">
                <button class="button button-user">유저</button>
                <button class="button button-write">글쓰기</button>
            </div>
        `;
    }

    mounted () {

    }

    setEvent() {
        this.addEvent('click','.button-user', (e) => {
            e.preventDefault();

            removeClassSelector($('.modal').get(), 'hidden');
        });

        this.addEvent('click','.button-write', (e) => {
            e.preventDefault();

            alert("아직 미완성이에요!");
        });
    }
}

