import Component from "../../../core/component";
import { $ } from "../../../utils/select" 
import './index.scss';
import {addClassSelector ,removeClassSelector} from '../../../utils/selectHandler';


export default class Snackbar extends Component {

    
  template(): string { 
        return` 
            <div class='snackbar-msg'>${this.props.msg}</div>
        `
    }

    mounted() {
      const $message = $('.snackbar-msg').get()

      setTimeout(() => {
        addClassSelector($('.snackbar').get(), 'show-snackbar');
      }, 0);
      
      if (this.props.backgroundColor) { 
        $message.style.backgroundColor = this.props.backgroundColor;
      }

      setTimeout(() => {
        removeClassSelector($('.snackbar').get(), 'show-snackbar');
        $message.style.backgroundColor = '#333';
      }, this.props.duration);
    }
}


