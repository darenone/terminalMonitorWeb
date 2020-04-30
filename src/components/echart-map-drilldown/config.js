const mapOption = {
    // title: {
    //     text: 'echart地图下钻',
    //     subtext: '省-市-区-县',
    //     sublink: 'https://gallery.echartsjs.com/editor.html?c=x_2hwwDQ9'
    // },
    tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>{c} (p / km2)'
    },
    visualMap: {
        min: 800,
        max: 50000,
        text: ['High', 'Low'],
        realtime: false,
        calculable: true,
        inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
        }
    },
    // grid: {
    //     left: '5%',
    //     right: '5%'
    // },
    series: [
        {
            name: '香港18区人口密度',
            type: 'map',
            // mapType: name, // 自定义扩展图表类型
            label: {
                show: false
            },
            zoom: 1.2,
            itemStyle: {
                normal: {
                    labelLine: { show: false },
                    areaColor: 'rgb(3, 39, 175)',
                    borderWidth: "2",
                    borderColor: '#fff',
                    borderShadowColor: '#ccc',
                    borderShadowBlur: '60',
                    borderShadowOffsetX: '30',
                    borderShadowOffsetY: '15',
                    shadowColor: 'rgba(128, 217, 248, 1)',
                    shadowOffsetX: [2, 2],
                    shadowBlur: 10
                }
            },
            data: []
        }
    ]
}

const setOption = (name) => {
    let option = {
        ...mapOption
    }
    option.series[0].mapType = name
    return option
}
export default setOption