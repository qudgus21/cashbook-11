import Observable from "../core/observable";

export default class DateStore extends Observable {
    state: { year: number; month: number; };

    constructor(time) {
        super();
        this.state = {
            year: time.getFullYear(),
            month: time.getMonth()+1,
        };
    }

    setState(nextState: { year: number; month: number; }) {
        this.state = nextState;
        this.notify(this.state);
    }

    moveToPreviousMonth() {
        let { year, month } = this.state;

        if (this.state.month === 1) {
            year--;
            month = 12;
        }
        else {
            month--;
        }
        
        this.setState({ year, month });
    }

    moveToNextMonth() {
        let { year, month } = this.state;

        if (this.state.month === 12) {
            year++;
            month = 1;
        }
        else {
            month++;
        }
        
        this.setState({ year, month });
    }
}