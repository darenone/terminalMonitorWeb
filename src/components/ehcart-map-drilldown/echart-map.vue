<template>
    <div class="map-wrapper">
        <div ref="chartMap" style="width: 100%;height: 100%;"></div>
    </div>
</template>
<script>
const echarts = require('echarts')
const _ = require('lodash')
import china from './../../../public/china-main-city/china.json'
import cityMap from './../../../public/china-main-city/china-main-city-map.js'
import chinaArea from './../../../public/china-main-city/china-area.json'
import  getSysOrgList from './../../../public/china-main-city/getSysOrgList.json'
import setOption from './config'
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'EchartMap',
    data () {
        return {

        }
    },
    computed: {
        ...mapState('area', [
            'drillLink',
            'selectedName'
        ]),
        myChart () {
            return echarts.init(this.$refs.chartMap);
        },
        getSysOrgList () {
            return getSysOrgList.data
        }
    },
    methods: {
        ...mapMutations('area', [
            'SET_DRILL_LINK',
            'DELETE_DRILL_LINK',
            'SET_SELECTED_NAME',
            'SET_SHOW_BAIDU_MAP'
        ]),
        setSize() {
            this.myChart.resize();
        },
        resizeChart() {
            // 监听窗口宽度变化
            window.onresize = () => {
                this.setSize();
            }
        },
        loadMap (name) {
            let promise
            let option = setOption(name)
            if (!cityMap[name]) return;
            promise = this.$http.get(`./china-main-city/${cityMap[name]}.json`).then(json => {
                echarts.registerMap(name, json);
                // mapCache[code] = json;
                // console.log(json)
                return json
            })
            promise.then(json => {
                if (this.myChart) {
                    this.myChart.clear();
                    this.myChart.setOption(option, {lazyUpdate: true});
                    this.myChart.off('click') // 先取消click再绑定
                    this.myChart.on('click', (params) => {
                        // console.log('点击了')
                        this.loadMap(params.name)
                        this.handleAreaName(params.name)
                    })
                    window.addEventListener("resize", () => { this.myChart.resize();});
                }
                // this._loadedMap = true;

                // this.$emit('on-loaded-map', json);
            })

            return promise
        },
        handleAreaName (name) {
            // 根据name把其拼接成 (4)-[1860]-{顺河回族区}的形式
            let obj = {}
            this.getSysOrgList.forEach(e0 => {
                if (e0.orgName == name) {
                    obj = {
                        name: name,
                        id: e0.orgCode,
                        optType: e0.orgType
                    }
                } else {
                    e0.children.forEach(e1 => {
                        if (e1.cityName == name) {
                            obj = {
                                name: name,
                                id: e1.cityCode,
                                optType: e1.cityType
                            }
                        } else {
                            if (e1.children) {
                                e1.children.forEach(e2 => {
                                    if (e2.areaName == name) {
                                        obj = {
                                            name: name,
                                            id: e2.areaCode,
                                            optType: 5
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            });
            this.SET_DRILL_LINK(obj)
            this.SET_SELECTED_NAME(`(${obj.optType})-[${obj.id}]-{${obj.name}}`)
            this.$bus.$emit('on-load-map')
            // areaType为4点击的是区县，此时应显示百度地图
            if (obj.optType == 4 || obj.optType == 5) {
                this.SET_SHOW_BAIDU_MAP(true)
            }
        },
        // 初始化地图
        initMap (name) {
            let reg1 = /\((.+?)\)/g // 匹配小括号
            let reg3 = /\{(.+?)\}/g // 匹配大括号
            let areaType = reg1.exec(name)[1]
            let areaName = reg3.exec(name)[1]
            // 显示百度地图
            if (areaType === '4') {

            } else {
                // 显示echart区块图
                this.loadMap(areaName)
            }
        }
    },
    mounted () {
        // 先判断缓存里是否有区域信息
        if (this.selectedName) {
            // 有 显示缓存的百度地图或区块图
            this.initMap(this.selectedName);
        } else {
            // 没有 默认显示中国地图
            this.loadMap('中国');
        }
        this.resizeChart(); // 添加监听事件，监听窗口变化
        this.setSize(); // 初始化图形大小
        this.$bus.$on('on-area-selected', (name) => {
            this.loadMap(name)
        })
    },
    beforeDestroy () {
        // 组件被销毁后解除监听事件
        window.onresize = null
        this.myChart.dispose();
    }
}
</script>
<style lang="less" scoped>
.map-wrapper {
    width: 100%;
    height: 100%;
}
</style>