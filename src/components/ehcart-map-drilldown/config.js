const mapOption = {
    title: {
        text: 'echar地图使用示例',
        subtext: '此demo来至于echart官方网站',
        sublink: 'https://gallery.echartsjs.com/editor.html?c=x_2hwwDQ9'
    },
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
    series: [
        {
            name: '香港18区人口密度',
            type: 'map',
            // mapType: name, // 自定义扩展图表类型
            label: {
                show: false
            },
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