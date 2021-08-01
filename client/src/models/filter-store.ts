import Observable from "../core/observable";
import api from "../utils/api";
import Snackbar from "../components/base/snackbar";
import { $ } from "../utils/select"

export default class FilterStore extends Observable {
    state: { isIncomeBoxClicked: boolean; isConsumeBoxClicked: boolean; };

    constructor() {
        super();
        this.state = {
            isIncomeBoxClicked: true,
            isConsumeBoxClicked: true,
        };
    }

    setState(nextState: { 
        isIncomeBoxClicked: boolean; 
        isConsumeBoxClicked: boolean; 
    }) {   
        this.state = nextState;
        this.notify(this.state);
    }
}