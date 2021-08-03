import { addClassSelector, removeClassSelector } from './selectHandler';
import { $ } from './select';

export const addModal = (): void => {
    let candidate = [
        $('.container-daybar').get(),
        $('.container-searchbar').get(),
        $('.appbar').get(),
        $('.container-statistics').get(),
    ];

    let zindex = [
        $('.container-statistics').get(),
    ]
   
    candidate.forEach((node) => { 
        if (node) { 
            addClassSelector(node, 'opacity')
            node.style.zIndex = 0;
            
        }
    })

    zindex.forEach((node) => { 
        if (node) node.style.zIndex = 0
    })

    document.body.style.overflowY = 'hidden'

    removeClassSelector($('.modal').get(), 'hidden');
}



export const removeModal = (): void => { 
    let candidate = [
        $('.container-daybar').get(),
        $('.container-searchbar').get(),
        $('.appbar').get(),
        $('.container-statistics').get(),
    ];

    let zindex = [
        $('.container-statistics').get(),
    ]


    candidate.forEach((node) => { 
        if(node) removeClassSelector(node, 'opacity')
    })

    zindex.forEach((node) => { 
        if (node) node.style.zIndex = 1;
    })

    document.body.style.overflowY = 'scroll'

    addClassSelector($('.modal').get(), 'hidden');
}