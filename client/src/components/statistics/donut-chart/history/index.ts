import Component from "../../../../core/component";
import { dateStore } from "../../../../models";
import api from "../../../../utils/api";
import { sortTrendData } from "../../../../utils/chartData";
import Line from "../../line-chart";
import CategoryHistory from "../../category-history";
import { $ } from "../../../../utils/select";
import './index.scss';

export default class History extends Component {

    setup () {
        dateStore.subscribe(this.makeHistory.bind(this));
        
    }
    
    template (): string { 
        return` 
            <div class="donut-history">
            </div>
        `
    }

    mounted() {
        this.makeHistory();

    }

    makeHistoryTemplate(data): string {
        return`
        <h2>이번 달 지출 금액 ${data.sum}</h2>
        <ul>
            ${data.trendData.reduce((acc, cur) => { 
                return acc + `
                    <li class="${cur.name}" id="category-${cur.categoryPK}">
                        <div class="category" style="background-color: ${cur.color}">${cur.name}</div>
                        <div class="ratio">${Math.round(cur.ratio)}%</div>
                        <div>${cur.amount}</div>
                    </li>
                `
            }, ``)}
        </ul>
        `
    }


    lineChartAndHistoryOpener(e) {
        const category = e.currentTarget.className;
        const categoryPK = e.currentTarget.id.split('-').pop();
        new Line($('.container-statistics .wrapper-line').get(), {category, categoryPK});
        new CategoryHistory($('.container-statistics .wrapper-history').get(), {category, categoryPK});
    }


    paintHistory(data) {
        $('.donut-history').get().innerHTML = this.makeHistoryTemplate(data);
        
        $('.donut-history li').getAll().forEach((item) => { 
            item.addEventListener('click', this.lineChartAndHistoryOpener)
        })
    }

    async makeHistory() {
        if (location.pathname !== '/statistics') return;
        
        $('.container-statistics .wrapper-line').get().innerHTML = ``;
        $('.container-statistics .wrapper-history').get().innerHTML = ``;

        const response = await api('GET', `/statistics/paytrend?month=${dateStore.state.month}&year=${dateStore.state.year}`)
        if (response.isFail) return;
        const sortedData = sortTrendData(response.payTrends)
        this.paintHistory(sortedData)
    }

}