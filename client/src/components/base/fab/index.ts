import Component from "../../../core/component";
import api from "../../../utils/api";
import { $ } from '../../../utils/select';

export default class Fab extends Component {

    setup () {
        this.state = {};
    }
    
    template (): string { 
        return`  
            <div class="container-fab">
                <button>유저</button>
                <form>
                    <label for="id">아이디<label/>
                    <input type="text" name="id" class="input-id" placeholder="아이디를 입력하세요"/>
                    <label for="password">비밀번호<label/>
                    <input type="password" name="password" class="input-password" placeholder="비밀번호를 입력하세요"/>
                </form>
                <button class="button-signup">회원가입</button>
                <button>글쓰기</button>
            </div>
        `;
    }

    mounted () {

    }

    setEvent() {
        this.addEvent('click','.button-signup', async (e) => {
            e.preventDefault();

            const id = $('.container-fab .input-id').get().value;
            const password = $('.container-fab .input-password').get().value;

            const response = await api('POST', '/user/signup', { id, password });
            
            if (response.isFail) {
                /* 스낵바를 띄워야 합니다. */
            } else {
                /* 성공했다고 스낵바를 띄웁니다. 뭔가 색깔을 다르게 띄워줘볼까 고민중입니다. */
            }
        });
    }
}

