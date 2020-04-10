<template>
    <div class="map-wrapper">
        <div class="map-header">
            <area-select></area-select>
        </div>
        <div class="map-body">
            <div class="link">
                <template v-for="(item, index) in drillLink">
                    <span :key="index" class="select-name" @click="drillLink.length - 1 !== index && selectName(item)" :style="{'color': drillLink.length - 1 == index ? '#3c97f8' : 'white'}">{{ item.name }}</span>
                    <i v-show="drillLink.length - 1 !== index" :key="`icon-${index}`" class="icon ivu-icon ivu-icon-ios-arrow-forward"></i>
                </template>
            </div>
            <vue-baidu-map v-if="showBaiduMap"></vue-baidu-map>
            <echart-map v-else ref="EchartMap"></echart-map>
        </div>
    </div>
</template>
<script>
const _ = require('lodash')
import EchartMap from './echart-map.vue'
import AreaSelect from '_c/area-select'
import VueBaiduMap from '_c/baidu-map/baidu-map.vue'
import chinaArea from './../../../public/china-main-city/china-area.json'
import  getSysOrgList from './../../../public/china-main-city/getSysOrgList.json'
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'EMapDrilldown',
    components: { 
        EchartMap,
        AreaSelect,
        VueBaiduMap
    },
    data () {
        return {
            
        }
    },
    computed: {
        ...mapState('area', [
            'drillLink',
            'showBaiduMap'
        ]),
        getSysOrgList () {
            return getSysOrgList.data
        }
    },
    methods: {
        ...mapMutations('area', [
            'DELETE_DRILL_LINK',
            'SET_SELECTED_NAME',
            'SET_SHOW_BAIDU_MAP'
        ]),
        selectName (item) {
            if (this.showBaiduMap) {
                this.SET_SHOW_BAIDU_MAP(false)
            }
            this.DELETE_DRILL_LINK(item.name)
            this.handleAreaName(item)
            this.$nextTick(() => {
                this.$refs.EchartMap.loadMap(item.name)
            })
        },
        handleAreaName (item) {
            // 根据name把其拼接成 (4)-[1860]-{顺河回族区}的形式
            // let areaName = []
            // areaName = _.filter(chinaArea, (item) => {
            //     return item.name == name
            // })
            // if (areaName.length) {
            //     // console.log(areaName)
            //     this.SET_SELECTED_NAME(`(${areaName[0].areaType})-[${areaName[0].id}]-{${areaName[0].name}}`)
            //     this.$bus.$emit('on-load-map')
            // } else {
            //     console.log('未匹配到名字', name)
            // }
            this.SET_SELECTED_NAME(`(${item.optType})-[${item.id}]-{${item.name}}`)
            this.$bus.$emit('on-load-map')
        },
    }
}
</script>
<style lang="less">
.map-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .map-header {
        height: 50px;
        flex: 50px 0;
        background: antiquewhite;
    }
    .map-body {
        flex: 1;
        background: lightcyan;
        position: relative;
        .link {
            position: absolute;
            right: 20px;
            top: 20px;
            z-index: 10;
            background: black;
            color: white;
            .select-name {
                user-select: none;
                cursor: pointer;
                &:hover {
                    // color: '#3c97f8';
                }
            }
        }
    }
}
</style>