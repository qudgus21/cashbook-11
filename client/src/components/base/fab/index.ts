import Component from "../../../core/component";

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
        });
    }
}
