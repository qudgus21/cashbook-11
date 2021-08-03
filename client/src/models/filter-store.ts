import Observable from "@core/observable";

export default class FilterStore extends Observable {
    state: { isIncomeBoxClicked: boolean; isConsumeBoxClicked: boolean; categorys: number; };

    constructor() {
        super();
        this.state = {
            isIncomeBoxClicked: true,
            isConsumeBoxClicked: true,
            categorys: -1,
        };
    }

    setState(nextState: { 
        isIncomeBoxClicked: boolean; 
        isConsumeBoxClicked: boolean; 
        categorys: number;
    }) {   
        this.state = nextState;
        this.notify(this.state);
    }

    reset() {
        this.state = {
            isIncomeBoxClicked: true,
            isConsumeBoxClicked: true,
            categorys: -1,
        };
    }
}