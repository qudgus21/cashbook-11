import './index.scss';
import Component from "../../../core/component";
import api from "../../../utils/api";
import { $ } from '../../../utils/select';
import { addClassSelector, removeClassSelector } from '../../../utils/selectHandler';
import { getCookie } from '../../../utils/cookie';


export default class DailyHistory extends Component {

    setup () {
        this.state = {};
    }
    
    template (): string {
        if (getCookie('JWT') == undefined) {
            return  `
                <div class="wrapper-img-login"> 
                    <img src="../../../src/assets/baedal.jpg" class="img-baedal" /> 
                    <div class= "footer"> 로그인을 먼저 하겠어! </div>
                </div>
            `;   
        }

        return`
            <div class="wrapper-filter"></div>
            <div class="wrapper-history">
                <ul>
                    <li class="category">문화/여가</li>
                    <li class="content">스트리밍서비스 정기 결제</li>
                    <li>현대 카드</li>
                    <li class="li-history-price">-10,900원</li>
                </ul>
            </div>
            <div class="wrapper-history">
                <ul>
                    <li class="category">문화/여가</li>
                    <li class="content">스트리밍서비스 정기 결제</li>
                    <li>현대 카드</li>
                    <li class="li-history-price">-10,900원</li>
                 </ul>
            </div>
            <div class="wrapper-history">
                <ul>
                    <li class="category">문화/여가</li>
                    <li class="content">스트리밍서비스 정기 결제</li>
                    <li>현대 카드</li>
                    <li class="li-history-price">-10,900원</li>
                </ul>
            </div>
            <div class="wrapper-history">
                <ul>
                    <li class="category">문화/여가</li>
                    <li class="content">스트리밍서비스 정기 결제</li>
                        <li>현대 카드</li>
                    <li class="li-history-price">-10,900원</li>
                </ul>
            </div>
        `;
    }

    mounted () {
    }
    
    setEvent() {

    }
}

