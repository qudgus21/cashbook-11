import { addClassSelector } from '@utils/selectHandler';
import { $ } from "./select";
import { removeClassSelector } from "./selectHandler";

export default async function routingEventHandler(nextUrl, doPageNeedToLogin){
    const $target = $('.app .container-content').get();
    
    if ($target.classList.contains('move-down')) return;

    if (!this.moveTo(nextUrl, doPageNeedToLogin)) return;

    $target.classList.add('move-down');
    
    setTimeout(() => {
        
        if (nextUrl === '/home' && !doPageNeedToLogin) {
            removeClassSelector($('.button-container-write').get(), 'invisible');
        } else {
            addClassSelector($('.button-container-write').get(), 'invisible');
        }

        $target.classList.add('move-up');
        setTimeout(()=> {
            $target.classList.remove('move-down', 'move-up');
        }, 1000);
    }, 1000)
}