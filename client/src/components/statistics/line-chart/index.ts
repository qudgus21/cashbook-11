import Component from "../../../core/component";
import { dateStore } from "../../../models";
import api from "../../../utils/api";
import { $ } from "../../../utils/select";
import './index.scss';

export default class Line extends Component {

    setup () {
        this.state = {
            data :null,
        };

        this.getChartData();
    }
    
    template (): string { 
        return` 
            <div class="container-line">
                <div>${this.props.category}</div>
                <div>라인</div>
                <div>라인</div>
                <div>라인</div>
                <div>라인</div>
                <div>라인</div>
                <div>라인</div>
                <div>라인</div>
                <div>라인</div>
            </div>
        `
    }


    async getChartData() {
        const response = await api('GET', `/statistics/category-paytrend?month=${dateStore.state.month}&year=${dateStore.state.year}&category=${this.props.category}`)
        if (response.isFail) return;
        this.setState({
            data:response.payTrends
        })
    }


  mounted() {
      // const $ExpenseByDay = document.createElement("div");
      // $ExpenseByDay.classList.add('expense-by-category')
      // $ExpenseByDay.innerHTML = `<div>테스트</div>`

      const { data } = this.state
        if (!data) return;
        
      let monthPay = [];
      for (let i = 1; i <= 12; i++) { 
        let idx = data.findIndex((item) => { 
          return item.month===i
        })
        idx === -1 ? monthPay.push(0) : monthPay.push(data[idx].amount)
      }
        
      $('.container-line').get().innerHTML = `
        <span>${this.props.category} 카테고리 소비 추이</span>
        <div class='expense-by-category__content'>
          <div class='content__expense-delimiter'>
            ${this.getExpenseDelimiterDOM(monthPay)}
          </div>
          <svg class='content__curved-chart' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 961 287'>
          </svg>
          <div class='content__day-delimiter'>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
            <span>11</span>
            <span>12</span>
          </div>
        </div>
      `

      console.log(monthPay)
    
    $('.content__curved-chart').get().innerHTML = this.getChartBaseLineDOM();
    $('.content__curved-chart').get().appendChild(this.getCurvedChartPath(monthPay));
    }

    
    setEvent(){

    }

  
    getCurvedChartPath(monthPay) {
      const $path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      $path.setAttribute('d', this.getPathDAttribute(monthPay));
      $path.setAttribute('fill', 'none');
      $path.setAttribute('stroke', '#5758BB');
      $path.setAttribute('stroke-width', '3');
      $path.setAttribute('stroke-dasharray', `${$path.getTotalLength()}`);
      // $path.setAttribute('style', `transform: scaleY(0.87) translateY(2px)`);
      const $animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      $animate.setAttribute('attributeName', 'stroke-dashoffset');
      $animate.setAttribute('from', `${$path.getTotalLength()}`);
      $animate.setAttribute('to', '0');
      $animate.setAttribute('dur', '1.5');
      $path.appendChild($animate);
  
      return $path;
    }
  
  
    getExpenseDelimiterDOM(data) { 
      const chartHorizontalDatas = this.getHorizontalDataInterval(data);
      const DOM = chartHorizontalDatas
        .reverse()
        .reduce((acc, curr) => [...acc, `<span>₩${curr}</span>`], [])
        .join('');
      return DOM;
    }
  
  
    getHorizontalDataInterval(data) {
      const INTERVAL_AMOUNT = 5;
  
      const max = Math.max(...data);
      const min = Math.min(...data);
      const intervalValue = Math.floor((max - min) / (INTERVAL_AMOUNT - 1));
  
      const distributedData = [0,1,2,3,4].reduce((acc, _, idx) => {

        if (idx === 0) return [min];
        if (idx === INTERVAL_AMOUNT - 1) return [...acc, max];
        return [...acc, intervalValue * idx];
      }, []);
  
      return distributedData;
    }
  
  
    getChartBaseLineDOM()  {
      const { height: SVGHeight } = $('.content__curved-chart').get().getBoundingClientRect();
      const BASELINE_AMOUNT = 5;
      // const baselineInterval = SVGHeight / (BASELINE_AMOUNT - 1);
      let baselineInterval = 95;
      const $DOM = [0, 1, 2, 3, 4].reduce((acc, _, idx) => {

        return [...acc, this.getBaseLineDOM(baselineInterval * idx)];
      }, []);


      return $DOM.join('');
    }
  
  
    getBaseLineDOM(pos) {
      const $baseline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      $baseline.setAttribute('x1', '0');
      $baseline.setAttribute('y1', `${pos-45}`);
      $baseline.setAttribute('x2', '961');
      $baseline.setAttribute('y2', `${pos-45}`);
      $baseline.setAttribute('stroke', 'red');
      // #9c9c9c
      $baseline.setAttribute('stroke-opacity', '.9');
      // $baseline.setAttribute('stroke-opacity', '.2');

      return $baseline.outerHTML;
    }
  

    getCoordinates(data?) {
      const { width: SVGWidth, height: SVGHeight } = $('.container-line').get().getBoundingClientRect();
      const maxDayOnMonth = 12;
      const intervalX = SVGWidth / (maxDayOnMonth - 1);
      const max = Math.max(...data);
      return data.reduce((acc, curr, idx) => [...acc, [idx * intervalX, (curr / max) * SVGHeight]], []);
    }
  
  
    getPathDAttribute(data?:any) {
      const coords = this.getCoordinates(data);
  
      const d = coords.reduce((acc, curr, idx, arr) => {
        const isFirstPoint = idx === 0;
        if (isFirstPoint) return `M ${curr[0]},${curr[1]}`;
        const [cpsX, cpsY] = this.getControlPoint(arr[idx - 2], arr[idx - 1], curr);
        const [cpeX, cpeY] = this.getControlPoint(arr[idx - 1], curr, arr[idx + 1], true);
        return `${acc} C ${cpsX+90}, ${cpsY-40} ${cpeX+90}, ${cpeY-40} ${curr[0]+90}, ${curr[1]-40}`;
      }, '');
  
      return d;
    }
  
  
    getControlPoint(prev ,curr , next, isEndControlPoint?: boolean) {
      const p = prev || curr;
      const n = next || curr;
      // const smoothDegree = 0.25;
      const smoothDegree = 0.2;

      const o = this.getOpposedLine(p, n);
      const angle = o.angle + (isEndControlPoint ? Math.PI : 0);
      const length = o.length * smoothDegree;
      const x = curr[0] + Math.cos(angle) * length;
      const y = curr[1] + Math.sin(angle) * length;
      return [x, y];
    }
  
  
    getOpposedLine(pointA, pointB) {
      const xLength = pointB[0] - pointA[0];
      const yLength = pointB[1] - pointA[1];
      const zLength = Math.sqrt(Math.pow(xLength, 2) + Math.pow(yLength, 2));
      const angle = Math.atan2(yLength, xLength);
      return { length: zLength, angle };
    }
  
}