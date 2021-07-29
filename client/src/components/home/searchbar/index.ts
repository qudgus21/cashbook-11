import './index.scss';
import Component from "../../../core/component";
import api from "../../../utils/api";
import { $ } from '../../../utils/select';
import { removeClassSelector } from '../../../utils/selectHandler';

export default class SearchBar extends Component {

    setup () {
        this.state = {};
    }
    
    template (): string { 
        return `
            <div class="container-searchbar">
                <ul>
                    <li>
                        <div>일자</div>   
                        
                    </li>
                    <li>
                        <div>분류</div>

                    </li>
                    <li>
                        <div>내용</div>

                    </li>
                    <li>
                        <div>결제수단</div>

                    </li>
                    <li>
                        <div>금액</div>

                    </li>
                    <button>V</button>
                </ul>
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
    }
}

