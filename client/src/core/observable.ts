export default class Observable {
    observers: Function[];
    fixedObservers: Function[];

    constructor() {
        this.observers = [];
        this.fixedObservers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    fixedSubscribe(observer) {
        this.fixedObservers.push(observer);
    }

    setState(newState?: any) {}

    unsubscribe(observer) {
        this.observers.filter(obs => observer !== obs);
    }

    unsubscribeAll() {
        this.observers = [];
    }

    notify(state) {
        this.observers.forEach(obs => {
            obs(state)
        });
        this.fixedObservers.forEach(obs => {
            obs(state)
        });
    }
}