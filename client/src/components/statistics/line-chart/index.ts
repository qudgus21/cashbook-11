import { CATEGORY_TAG } from '@constants/category';
import Component from "@core/component";
import { dateStore } from "@src/models";
import api from "@utils/api";
import { $ } from "@utils/select";
import { addClassSelector, removeClassSelector } from "@utils/selectHandler";
import './index.scss';
import lineSvg from "./line-svg";
import comma from '@utils/comma';

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
              <h2>${this.props.category} 카테고리 소비 추이</h2>
              <svg viewBox="0 0 600 400" width="100%" height="100%" id="line-svg"></svg> 
              <div class="svg-line-description"></div>
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

  tooltipHandler(e) {
      $('.svg-line-description').get().style.left = `${e.offsetX}px`
      $('.svg-line-description').get().style.top = `${e.offsetY-20}px`
  }

  
    tooltipOn(e) { 
      addClassSelector(e.currentTarget, 'inner');
      addClassSelector($('.svg-line-description').get(), 'active'); 
      e.currentTarget.addEventListener('mousemove', this.tooltipHandler)
      $('.svg-line-description').get().innerHTML = `${comma(e.currentTarget.classList[1])}원`
    }


    tooltipOff(e) { 
        removeClassSelector(e.currentTarget, 'inner');
        $('.svg-line-description').get().classList.remove('active')
        e.currentTarget.removeEventListener('mousemove', this.tooltipHandler)
    }


    addChartEvent() { 
      $('.container-line circle').getAll().forEach((circle) => { 
        circle.addEventListener('mouseover', (e) => {
              this.tooltipOn(e);
          })
          circle.addEventListener('mouseleave', (e) => {
              this.tooltipOff(e)
          })
      })
    }

  
  mounted() { 

      addClassSelector($('.container-line').get(), 'fadein')

      setTimeout(() => {
          removeClassSelector($('.container-line').get(), 'fadein')
      }, 1500);


      const { data } = this.state
      
      if (!data) return;
 
      let monthPay = [];
      for (let i = 1; i <= 12; i++) { 
        let idx = data.findIndex((item) => { 
          return item.month===i
        })
        idx === -1 ? monthPay.push([i, 0]) : monthPay.push([i,data[idx].amount])
      }

      let idx = CATEGORY_TAG.findIndex((item) => { 
        return item.title === data[0].Category.name
      })
      
      lineSvg(monthPay, CATEGORY_TAG[idx].color);

      this.addChartEvent()
    }  
}