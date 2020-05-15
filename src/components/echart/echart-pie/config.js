let colorConfig = {
    series_itemStyle_color: '#01C2E2', // 拐点标志的颜色
}
let option1 = {
    // grid: {
    //     left: '10%',
    //     right: '10%',
    //     bottom: '20%',
    //     top: '14%',
    //     containLabel: true,
    //     borderWidth: '0'
    // },
    legend: {
        show: false
    },
    tooltip: {
        trigger: 'item'
    },
    color: ['#C23531', '#274F93', '#CA8622', '#6491DC', '#626F8E']
}
export default function formatOption (data) {
    return {
        ...option1,
        series: {
            type: 'pie',
            radius: ['55%', '70%'],
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 12
                    }
                }
            },
            avoidLabelOverlap: false,
            // itemStyle: {
            //     color: colorConfig.series_itemStyle_color
            // },
            data: data
        }
    }
}