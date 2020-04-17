<template>
    <vue-baidu-map class="bm-view" ak="xHuqN6if3aQHIyH4rwTkGc3NRgF4GLby" 
        :center="center" 
        :zoom="zoom" 
        @ready="ready" 
        @load="load" 
        @unload="unload" 
        @reload="reload">
    </vue-baidu-map>
</template>
<script>
import VueBaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { mapState, mapMutations } from 'vuex'
import ZMap from '@/lib/ZMap.js'
export default {
    name: 'baiduMap',
    components: { VueBaiduMap },
    data () {
        return {
            center: {lng: 0, lat: 0},
            zoom: 3,
            BMap: null,
            map: null,
            ZMap: null, // ZMap函数实例
        }
    },
    computed: {
        ...mapState('area', [
            'selectedName',
            'showBaiduMap'
        ]),
        areaName () {
            return this.selectedName
        }
    },
    methods: {
        ready ({BMap, map}) {
            // BMap 百度地图核心类
            // map 地图实例
            // console.log(BMap, map)
            // this.center.lng = 116.404
            // this.center.lat = 39.915
            // this.zoom = 15
            // let bs = map.getBounds() // 获取可视区域
            // let bssw = bs.getSouthWest() // 可视区域左下角
            // let bsne = bs.getNorthEast() // 可视区域右上角
            // // console.log("当前地图可视范围是：" + bssw.lng + "," + bssw.lat + "到" + bsne.lng + "," + bsne.lat)
            // let center = map.getCenter()
            // // console.log("当前可视区域中心点：" + center.lng + center.lat)
            // this.add_scaleControl({BMap, map})
            // map.enableScrollWheelZoom() // 开启鼠标滚轮缩放
            // let point1 = new BMap.Point(116.404, 39.915)
            // let marker1 = new BMap.Marker(point1)
            // let point2 = new BMap.Point(116.404, 39.9060009)
            // let marker2 = new BMap.Marker(point2)
            // map.addOverlay(marker1)
            // map.addOverlay(marker2)
            console.log('ready')
            this.BMap = null
            this.map = null
            this.BMap = BMap
            this.map = map
            let areaName = this.getAreaName(this.selectedName)
            this.ZMap = new ZMap({BMap, map})
            this.ZMap.init(areaName)
        },
        // 添加比例尺控件
        add_scaleControl ({BMap, map}) {
            let bottom_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT, offset: new BMap.Size(0, 100) })
            map.addControl(bottom_left_control)
        },
        load () {
            // console.log('地图加载了')
        },
        unload () {
            // console.log('地图卸载了')
        },
        reload () {
            // console.log('地图重新加载了')
        },
        getAreaName (name) {
            let reg = /\{(.+?)\}/g // 匹配大括号
            let areaName = reg.exec(name)
            if (areaName) {
                return areaName[1]
            } else {
                console.log('区县名字未知')
            }
        }
    },
    watch: {
        areaName(name) {
            // console.log(name)
            let BMap = this.BMap
            let map = this.map
            let areaName = this.getAreaName(this.selectedName)
            this.ZMap.init(areaName)
        },
    },
    mounted () {

    },
}
</script>
<style lang="less">
.bm-view {
    height: 500px;
}
</style>