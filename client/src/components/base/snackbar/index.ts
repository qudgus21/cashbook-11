import Component from "../../../core/component";
import { $ } from "../../../utils/select" 
import './index.scss';
export default class Snackbar extends Component {

    
  template(): string { 
        return` 
            <div class='snackbar-msg'>${this.props.msg}</div>
        `
    }

    mounted() {
      const $snackbar = $('.snackbar').get()
      const $message = $('.snackbar-msg').get()

      setTimeout(() => {
        $snackbar.classList.add('show-snackbar');
      }, 0);
      
      if (this.props.backgroundColor) { 
        $message.style.backgroundColor = this.props.backgroundColor;
      }

      setTimeout(() => {
        $snackbar.classList.remove('show-snackbar');
        $message.style.backgroundColor = '#333';
      }, this.props.duration);


    }
}


