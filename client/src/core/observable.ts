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
        console.log('고정 구독 했습니다.', observer);
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
        console.log(state);
        console.log('일반 옵저버');
        this.observers.forEach(obs => {
            console.log(obs);
            obs(state)
        });
        console.log('고정 옵저버');
        this.fixedObservers.forEach(obs => {
            console.log(obs);
            obs(state)
        });
    }
}