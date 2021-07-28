
export default class Observable {
    observers: Function[];
    
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        console.log(`subscribe(${observer})`);
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        console.log(`unsubscribe(${observer})`);
        this.observers.filter(obs => observer !== obs);
    }

    notify(state) {
        console.log(`notify(${state})`);
        console.log(state);
        this.observers.forEach(obs => obs(state));
    }
}