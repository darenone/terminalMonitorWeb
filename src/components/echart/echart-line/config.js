let colorConfig = {
    y_axisLabel_color: '#5B6888', // y坐标轴刻度标签文字颜色
    y_splitLine_color: '#27487D', // y坐标轴分割线颜色
    x_axisLabel_color: '#5B6888', // x坐标轴刻度标签文字颜色
    x_axisLine_color: '#27487D', // x坐标轴的颜色
    series_lineStyle_color: '#01C2E2', // 折线线的颜色
    series_itemStyle_color: '#01C2E2', // 拐点标志的颜色
}
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
            show: true,
            lineStyle: {
                color: colorConfig.x_axisLine_color
            }
        },
        axisTick: {
            show: true,
            alignWithLabel: true, // 刻度线与标签对齐
        },
        boundaryGap: true,
        // data: this.xData,
        axisLabel: {
            textStyle: {
                fontSize: 12,
                color: colorConfig.x_axisLabel_color
            },
            formatter: function (value, index) {
                try {
                    let val = Number(value)
                    if (value < 10) {
                        return `0${value}`
                    } else {
                        return value
                    }
                }
                catch(err) {
                    console.log('在格式化折线图x坐标轴刻度标签时出错！')
                }
            }
        }
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
                color: colorConfig.y_axisLabel_color
            },
            formatter: '{value} 万'
        },
        splitLine: {
            lineStyle: {
                width: 1,
                type: 'dashed',
                color: colorConfig.y_splitLine_color
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
    },
    tooltip: {
        trigger: 'axis'
    }
}
export default function formatOption (data) {
    return {
        ...option1,
        series: {
            type: 'line',
            lineStyle: {
                color: colorConfig.series_lineStyle_color,
                width: 2
            },
            itemStyle: {
                color: colorConfig.series_itemStyle_color
            },
            smooth: true, // 平滑曲线
            symbolSize: 6, // 拐点大小
            data: data
        }
    }
}