import Component from "@core/component";
import './index.scss'

export default class Daybar extends Component {
    
    template (): string { 
        return ` 
            <div class="container-daybar">
                <ul>
                    <li>일</li>
                    <li>월</li>
                    <li>화</li>
                    <li>수</li>
                    <li>목</li>
                    <li>금</li>
                    <li>토</li>
                </ul>
            </div>
        `
    }
}