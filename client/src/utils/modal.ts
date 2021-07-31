import { addClassSelector, removeClassSelector } from './selectHandler';
import { $ } from './select';

export const addModal = (): void => {
    let candidate = [
        $('.container-daybar').get(),
        $('.container-searchbar').get(),
        $('.appbar').get(),
    ];
   
    candidate.forEach((node) => { 
        if(node) addClassSelector(node, 'opacity')
    })

    removeClassSelector($('.modal').get(), 'hidden');
}



export const removeModal = (): void => { 
    let candidate = [
        $('.container-daybar').get(),
        $('.container-searchbar').get(),
        $('.appbar').get(),
    ];

    candidate.forEach((node) => { 
        if(node) removeClassSelector(node, 'opacity')

    })
    addClassSelector($('.modal').get(), 'hidden');
}