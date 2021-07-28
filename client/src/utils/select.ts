export const $ = (selector: string): any => {
    return {
        get() : HTMLElement {
            return document.querySelector(selector);
        },

        getAll(): NodeListOf<Element> {
            return document.querySelectorAll(selector);
        }
    }
};