
export default class Observable {
    observers: Function[];
    
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers.filter(obs => observer !== obs);
    }

    notify(state) {
        this.observers.forEach(obs => obs(state));
    }
}