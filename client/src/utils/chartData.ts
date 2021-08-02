import { CATEGORY_TAG } from './../constants/category';

export const sortTrendData = (payTrends) => { 
    let sum = 0;
    let trendData = [];
    
    payTrends.forEach((candidate) => { 
        let idx = trendData.findIndex((inserted) => { 
            return inserted.name === candidate.Category.name;
        })
        if (idx === -1) {
            let obj = {
                name: candidate.Category.name,
                amount: candidate.amount,
            }
            trendData.push(obj)
        } else { 
            trendData[idx].amount += candidate.amount;
        }
        sum += candidate.amount;
    })

    trendData.forEach((item) => { 
        let idx = CATEGORY_TAG.findIndex(category => { return category.title === item.name });
        item.ratio = Number(((item.amount / sum) * 100).toFixed(2))
        item.color = CATEGORY_TAG[idx].color
    })

    trendData = trendData.sort((a,b) => { 
        return b.ratio - a.ratio
    })

    return {trendData , sum}
}
