
import './index.scss';
import Component from "@core/component";
import { $ } from '@utils/select';
import { removeModal } from '@utils/modal';
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


        new ModalContent($modalContent, {appbar : this.props.appbar});
    }

    setEvent() {
        this.addEvent('click','.modal .modal-background', (e) => {
            e.preventDefault();
            removeModal();
        });
    }
}

