import './index.scss';
import Component from "../../../core/component";
import api from "../../../utils/api";
import { $ } from '../../../utils/select';
import { addClassSelector, removeClassSelector } from '../../../utils/selectHandler';

export default class Fab extends Component {

    setup () {
        this.state = {};
    }
    
    template (): string { 
        return`
            <div class="container-fab">
                <button class="button button-user">
                    <img src="../../../src/assets/account.svg"/>
                </button>
                <button class="button button-write">
                    <img src="../../../src/assets/add_white.svg"/>
                </button>
            </div>
        `;
    }

    mounted () {

    }

    setEvent() {
        this.addEvent('click','.button-user', (e) => {
            e.preventDefault();
            if ($('.container-daybar').get()){ 
                addClassSelector($('.container-daybar').get(), 'opacity')
            }
            addClassSelector($('.appbar').get(), 'opacity')
            removeClassSelector($('.modal').get(), 'hidden');
        });

        this.addEvent('click','.button-write', (e) => {
            e.preventDefault();

            alert("아직 미완성이에요!");
        });
    }
}

