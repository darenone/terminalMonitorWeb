let option1 = {
    grid: { 
        left: '1rem',
        right: '4%',
        bottom: '20%',
        top: '14%',
        containLabel: true,
        borderWidth: '0'
    },
    xAxis: [{
        type: 'category',
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false,
        },
        boundaryGap: true,
        // data: this.xData,
    }],
    yAxis: {
        type: 'value',
        // name: this.yName,
        nameTextStyle: {
            fontSize: 14,
            color: '#4D4D4D',
            align: 'left'
        },
        axisLabel: {
            textStyle: {
                fontSize: 12,
                color: '#4D4D4D'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#707070'
            }
        },
        splitLine: {
        lineStyle: {
            width: 1,
            type: 'dashed'
        }
        },
        axisLine: {
            show: false,
            lineStyle: {
                color: '#CCCCCC'
            }
        },
        axisTick: {
            show: false
        },
        min: 0,
        // max: 'dataMax'
    },
    legend: {
        // data: this.legend,
        x: 'right',
        icon: 'rect',
        align: 'left',
        itemWidth: 14,
        itemHeight: 10,
        itemGap: 13
    }
}
export default function formatOption (data) {
    return {
        ...option1,
        series: {
            type: 'line',
            data: data
        }
    }
}