import { CATEGORY_TAG } from './../../../../constants/category';
import Component from "../../../../core/component";
import { dateStore } from "../../../../models";
import api from "../../../../utils/api";
import { $ } from "../../../../utils/select";
import { sortTrendData } from '../../../../utils/chartData';
import './index.scss';
import { addClassSelector, removeClassSelector } from '../../../../utils/selectHandler';


export default class Chart extends Component {

    setup() {
        dateStore.subscribe(this.makeChart.bind(this));
    }
    

    template (): string { 
        return` 
            <div class="wrapper-doughnut-svg"></div>
            <div class="svg-description"></div>
            `
    }


    mounted() {
        this.makeChart();
    }


    tooltipHandler(e) { 
        $('.svg-description').get().style.left = `${e.pageX}px`
        $('.svg-description').get().style.top = `${e.pageY - 180}px`
    }

    
    tootipOn(e) { 
        addClassSelector(e.currentTarget, 'inner');
        addClassSelector($('.svg-description').get(), 'active');
        $('.svg-description').get().innerHTML = e.currentTarget.id
        e.currentTarget.addEventListener('mousemove', this.tooltipHandler)
    }


    tooltipOff(e) { 
        removeClassSelector(e.currentTarget, 'inner');
        $('.svg-description').get().classList.remove('active')
        e.currentTarget.removeEventListener('mousemove', this.tooltipHandler)
    }


    addChartEvent() { 
        $('path').getAll().forEach((path) => { 
            path.addEventListener('mouseover', (e) => {
                this.tootipOn(e);
            })
            path.addEventListener('mouseleave', (e) => {
                this.tooltipOff(e)
            })
        })
    }


    paintChart(data) { 

        let donut = $(".wrapper-doughnut-svg").get()
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), filled = 0;
        svg.setAttribute("viewBox", "-1.5 -1.5 3 3");
        donut.innerHTML = ``;
        donut.appendChild(svg);
        svg.innerHTML = this.getDoughnutChartPaths(data)
        this.addChartEvent()
    }


    async makeChart() {
        if (location.pathname !== '/statistics') return;
        const response = await api('GET', `/statistics/paytrend?month=${dateStore.state.month}&year=${dateStore.state.year}`)        
        if (response.isFail) return;
        const sortedData = sortTrendData(response.payTrends)
        sortedData.trendData.forEach((item => {
            item.ratio = item.ratio/100
        }))
        this.paintChart(sortedData.trendData)
    }


    getCoordinatesForPercent(percent: number): any[] {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    }


    getDoughnutChartPaths(data) {
        let accumulatedPercent = 0;
        const paths = data
            .map(({ ratio, name, color }, idx) => {
            const [startX, startY] = this.getCoordinatesForPercent(accumulatedPercent);
            accumulatedPercent += ratio;
            const [endX, endY] = this.getCoordinatesForPercent(accumulatedPercent);
            const isLargeArcFlag = ratio > 0.5 ? 1 : 0;
            return this.getCategoryDataPath({ ratio, name , color }, { startX, startY, endX, endY, isLargeArcFlag }, idx);
          })
          .join('');
        return paths;
    }
    

    getCategoryDataPath(
        { ratio, name, color  },
        { startX, startY, endX, endY, isLargeArcFlag },
        idx
    ) {
        const targetRad = 2 * Math.PI * ratio;
        const targetRestRad = 2 * Math.PI * (1 - ratio);
        const animationDuration = 0.2;
        const $path = document.createElementNS('http://www.w3.org/1999/svg', 'path');
        $path.setAttribute('d', `M ${startX} ${startY} A 1 1 0 ${isLargeArcFlag} 1 ${endX} ${endY} L 0 0`);
        $path.setAttribute('fill', 'none');
        $path.setAttribute('stroke-width', '0.4');
        $path.setAttribute('stroke', `${color}`);
        $path.setAttribute('stroke-dasharray', `${targetRad} ${ratio>0.83?``:`${ targetRestRad}`}`);
        $path.setAttribute('stroke-dashoffset', `${targetRad}`);
        $path.setAttribute('id', name)
        const $animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        $animate.setAttribute('attributeName', 'stroke-dashoffset');
        $animate.setAttribute('begin', `${animationDuration * idx}`);
        $animate.setAttribute('from', `${targetRad}`);
        $animate.setAttribute('to', '0.025');
        $animate.setAttribute('dur', `${animationDuration}`);
        $animate.setAttribute('fill', 'freeze');
        $path.appendChild($animate);
        return $path.outerHTML;
      }
}