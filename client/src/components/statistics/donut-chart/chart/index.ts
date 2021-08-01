import { CATEGORY_TAG } from './../../../../constants/category';
import Component from "../../../../core/component";
import { dateStore } from "../../../../models";
import api from "../../../../utils/api";
import { $ } from "../../../../utils/select";
import { sortTrendData } from '../../../../utils/chartData';
import './index.scss';

export default class Chart extends Component {

    setup() {
        dateStore.subscribe(this.makeChart.bind(this));
    }
    
    template (): string { 
        return` 
            <div id="doughnut">
            </div>
        `
    }

    mounted() {
        this.makeChart();
    }


    paintChart(data) { 
        let donut = $("#doughnut").get(),
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), filled = 0;
        svg.setAttribute("width","100%");
        svg.setAttribute("height","100%");
        svg.setAttribute("viewBox", "0 0 100 100");
        donut.innerHTML = ``;
        donut.appendChild(svg);
        data.forEach(function(o,i){
            let circle = document.createElementNS("http://www.w3.org/2000/svg","circle"),
            startAngle = -90,
            radius = 30,
            cx = 50,
            cy = 50,
            animationDuration = 1000,
            strokeWidth = 15,
            dashArray = 2*Math.PI*radius,
            dashOffset = dashArray - (dashArray * o.fill / 100),
            angle = (filled * 360 / 100) + startAngle,
            currentDuration = animationDuration * o.fill / 100,
            delay = animationDuration * filled / 100;
            circle.setAttribute("r",radius.toString());
            circle.setAttribute("cx",cx.toString());
            circle.setAttribute("cy",cy.toString());
            circle.setAttribute("fill","transparent");
            circle.setAttribute("stroke",o.color);
            circle.setAttribute("stroke-width",strokeWidth.toString());
            circle.setAttribute("stroke-dasharray",dashArray.toString());
            circle.setAttribute("stroke-dashoffset",dashArray.toString());
            circle.style.transition = "stroke-dashoffset "+currentDuration+"ms linear "+delay+"ms";
            circle.setAttribute("transform","rotate("+(angle)+" "+cx+" "+cy+")");
            svg.appendChild(circle);
            filled+= o.fill;
            setTimeout(function(){
                circle.style["stroke-dashoffset"] = dashOffset;
            },100);
        })
    }


    async makeChart() {
        const response = await api('GET', `/statistics/paytrend?month=${dateStore.state.month}&year=${dateStore.state.year}`)
        if (response.isFail) return;
        const sortedData = sortTrendData(response.payTrends)
        let data = sortedData.trendData.reduce((acc, cur) => { 
            return acc.concat({
                fill: cur.ratio,
                color : cur.color
            })
        }, [])
        this.paintChart(data)
    }
}