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
        console.log(this.observers);
        this.observers = [];
        console.log("전부 구독 해제 시킵니다.!");
        console.log(this.fixedObservers);
    }

    notify(state) {
        this.observers.forEach(obs => obs(state));
        this.fixedObservers.forEach(obs => obs(state));
    }
}