
import './index.scss';
import Component from "../../../core/component";
import api from "../../../utils/api";
import { $ } from '../../../utils/select';
import { addClassSelector,removeClassSelector } from '../../../utils/selectHandler';
import ModalContent from './modal-content';

export default class Modal extends Component {

    setup () {
        this.state = {};
    }
    
    template (): string { 
        return `
            <div class="modal hidden">
                <div class="modal-background"></div>
                <div class="modal-content"></div>
            </div>
        `;
    }


    mounted () {
        const $modalContent = $('.modal .modal-content').get();

        new ModalContent($modalContent);
    }

    setEvent() {
        this.addEvent('click','.modal .modal-background', (e) => {
            e.preventDefault();

            if ($('.container-daybar').get()){ 
                removeClassSelector($('.container-daybar').get(), 'opacity');
            }
            removeClassSelector($('.appbar').get(), 'opacity');
            addClassSelector($('.modal').get(), 'hidden');
        });
    }
}

