<template>
    <div class="area-select">
        <Dropdown trigger="custom" placement="bottom-start" :visible="collapse" @on-clickoutside="handleClose"  @on-click="handleItemClick">
            <a href="javascript:void(0)" @click="handleAClick" class="area-select-a">
                {{ okName }}
                <i :class="collapseClass" style="font-size: 19px;"></i>
            </a>
            <DropdownMenu slot="list">
                <!-- 省  1 / 直辖市 3-->
                <div class="item">
                    <!-- <DropdownItem v-for="(item, index) in provinceList" :key="index" :name="`(1)-[${item.id}]-{${item.name}}`" :class="{active:item.id==provinceCode}">{{ item.name }}</DropdownItem> -->
                    <DropdownItem v-for="(item, index) in getSysOrgList" :key="index" :name="`(${item.orgType})-[${item.orgCode}]-{${item.orgName}}`" :class="{active:item.orgCode==provinceCode}">{{ item.orgName }}</DropdownItem>
                </div>
                <!-- 市 2 / 直辖市-区县 4  -->
                <div class="item" :style="{border: cityList.length ? '' : 'none'}">
                    <!-- <DropdownItem v-for="(item, index) in cityList" :key="index" :name="`(2)-[${item.id}]-{${item.name}}`" :class="{active:item.id==cityCode}">{{ item.name }}</DropdownItem> -->
                    <DropdownItem v-for="(item, index) in cityList" :key="index" :name="`(${item.cityType})-[${item.cityCode}]-{${item.cityName}}`" :class="{active:item.cityCode==cityCode}">{{ item.cityName }}</DropdownItem>
                </div>
                <!-- 地市-区县 4 -->
                <div class="item" :style="{border: districtList.length ? '' : 'none'}">
                    <DropdownItem v-for="(item, index) in districtList" :key="index" :name="`(5)-[${item.areaCode}]-{${item.areaName}}`" :class="{active:item.areaCode==districtCode}">{{ item.areaName }}</DropdownItem>
                </div>
                <div class="button">
                    <Button @click="handleReset">取消</Button>
                    <Button type="primary" @click="handleOk">确认</Button>
                </div>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>
<script>
const _ = require('lodash')
import chinaArea from './../../../public/china-main-city/china-area.json'
import  getSysOrgList from './../../../public/china-main-city/getSysOrgList.json'
import { mapState, mapMutations } from 'vuex'
export default {
    data () {
        return {
            collapse: false,
            provinceList:  [], // 省/直辖市
            cityList: [], // 市
            districtList: [], // 区县
            areaName: '中国',
            provinceCode: null,
            cityCode: null,
            districtCode: null,
            provinceName: null,
            cityName: null,
            districtName: null
        }
    },
    computed: {
        ...mapState('area', [
            'selectedName',
            'showBaiduMap'
        ]),
        // 小图标展开收缩
        collapseClass () {
            return this.collapse ? 'ivu-icon ivu-icon-md-arrow-dropdown' : 'ivu-icon ivu-icon-md-arrow-dropright'
        },
        okName () {
            let reg = /\{(.+?)\}/g // 匹配大括号
            let areaName = reg.exec(this.areaName)
            if (areaName) {
                return areaName[1]
            } else {
                return this.areaName
            }
        },
        getSysOrgList () {
            return getSysOrgList.data
        }
    },
    methods: {
        ...mapMutations('area', [
            'SET_SELECTED_NAME',
            'DELETE_DRILL_LINK',
            'SET_DRILL_LINK',
            'SET_SHOW_BAIDU_MAP'
        ]),
        handleAClick () {
            this.collapse = !this.collapse
        },
        handleItemClick (name) {
            let reg1 = /\((.+?)\)/g // 匹配小括号
            let reg2 = /\[(.+?)\]/g // 匹配中括号
            let reg3 = /\{(.+?)\}/g // 匹配大括号
            let areaType = reg1.exec(name)[1]
            let areaCode = reg2.exec(name)[1]
            let areaName = reg3.exec(name)[1]
            this.areaCode = areaCode
            // console.log(areaType)
            // console.log(areaCode)
            // console.log(areaName)
            this.areaName = name
            switch (areaType) {
                // 省
                case '1':
                    this.handleCity(areaCode)
                    this.provinceCode = areaCode
                    this.provinceName = areaName
                    this.cityCode = null
                    this.districtCode = null
                    break;
                // 市
                case '2':
                    this.handleDistrict(areaCode)
                    this.cityCode = areaCode
                    this.cityName = areaName
                    this.districtCode = null
                    break;
                // 直辖市
                case '3':
                    this.handleCity(areaCode)
                    this.provinceCode = areaCode
                    this.provinceName = areaName
                    this.cityCode = null
                    this.districtCode = null
                    break;
                // 直辖市的区县
                case '4':
                    this.cityCode = areaCode
                    this.cityName = areaName
                    this.districtCode = null
                    break;
                // 直辖市-区县或地市-区县
                default:
                    this.districtCode = areaCode
                    this.districtName = areaName
                    break;
            }
        },
        // 把省或直辖市筛选出来
        handleProvince () {
            // this.provinceList = _.filter(chinaArea, (item) => {
            //     return item.pId == 0
            // })
            // console.log(this.getSysOrgList)
            // this.provinceList = _.filter(this.getSysOrgList, (item) => {
            //     return item.orgType == 3 || item.orgType == 1
            // })
        },
        // 把市筛选出来
        handleCity (pid) {
            // console.log(pid)
            // console.log(this.getSysOrgList)
            this.cityList = [] // 先置空
            this.districtList = []
            let arr = _.filter(this.getSysOrgList, (item) => {
                return item.orgCode == pid
            })
            // console.log('arr', arr)
            if (arr.length) {
                this.cityList = arr[0].children
            }
            // console.log(this.cityList)
        },
        // 把区县筛选出来
        handleDistrict (pid) {
            this.districtList = [] // 先置空
            this.districtList = _.filter(this.cityList, (item) => {
                return item.cityCode == pid
            })[0].children
        },
        handleClose (event) {
            this.collapse = false
        },
        handleReset () {
            if (this.selectedName) {
                this.initAreaName(this.selectedName)
            } else {
                this.areaName = '中国'
                // 取消选中
                this.provinceCode = null
                this.cityCode = null
                this.districtCode = null
                // 市和区县list置空
                this.cityList = []
                this.districtList = []
            }
            this.collapse = false
        },
        handleOk () {
            // console.log(this.areaName)
            this.SET_SELECTED_NAME(this.areaName)
            this.collapse = false
            this.setDrillLink(this.areaName)
            // 判断选中的额区域是否是区县
            let reg1 = /\((.+?)\)/g // 匹配小括号
            let areaType = reg1.exec(this.areaName)[1]
            if (areaType == 4 || areaType == 5) {
                // 是区县
                this.SET_SHOW_BAIDU_MAP(true)
            } else {
                // 不是区县，正常加载区块地图
                // 触发echart-map组件下钻
                if (this.showBaiduMap) {
                    this.SET_SHOW_BAIDU_MAP(false)
                }
                this.$bus.$emit('on-area-selected', this.okName)
            }
        },
        setDrillLink(name) {
            // 改变vuex里的drillLink
            let reg1 = /\((.+?)\)/g // 匹配小括号
            let reg2 = /\[(.+?)\]/g // 匹配中括号
            let reg3 = /\{(.+?)\}/g // 匹配大括号
            let areaType = reg1.exec(name)[1]
            let areaCode = reg2.exec(name)[1]
            let areaName = reg3.exec(name)[1]
            // console.log(areaType)
            // console.log(areaCode)
            // console.log(areaName)
            switch (areaType) {
                // 省
                case '1':
                    this.DELETE_DRILL_LINK('中国') // 先让drillLink回到初始值
                    this.SET_DRILL_LINK({
                        optType: areaType,
                        id: areaCode,
                        name: areaName
                    })
                    break;
                // 地市
                case '2':
                    {
                        let num = 0
                        this.getSysOrgList.forEach(e1 => {
                            if (e1.children && e1.children.length) {
                                e1.children.forEach(e2 => {
                                    if (e2.cityCode == areaCode) {
                                        this.DELETE_DRILL_LINK('中国') // 先让drillLink回到初始值
                                        this.SET_DRILL_LINK({
                                            optType: e1.orgType,
                                            id: e1.orgCode,
                                            name: e1.orgName
                                        })
                                        this.SET_DRILL_LINK({
                                            optType: e2.cityType,
                                            id: e2.cityCode,
                                            name: e2.cityName
                                        })
                                        num = 1
                                    }
                                })
                            }
                            if (num == 1) {
                                return;
                            }
                        });
                    }
                    break;
                // 直辖市
                case '3':
                    this.DELETE_DRILL_LINK('中国') // 先让drillLink回到初始值
                    this.SET_DRILL_LINK({
                        optType: areaType,
                        id: areaCode,
                        name: areaName
                    })
                    break;
                // 直辖市的区县
                case '4':
                    this.DELETE_DRILL_LINK('中国') // 先让drillLink回到初始值
                    this.SET_DRILL_LINK({
                        optType: 1,
                        id: this.provinceCode,
                        name: this.provinceName
                    })
                    this.SET_DRILL_LINK({
                        optType: 4,
                        id: areaCode,
                        name: areaName
                    })
                    // console.log(this.provinceCode)
                    // console.log(this.provinceName)
                    // console.log(this.cityCode)
                    // console.log(this.cityName)
                    break;
                // 地市的区县
                default:
                    {
                        let num = 0
                        let num1 = 0
                        this.getSysOrgList.forEach(e1 => {
                            if (e1.children && e1.children.length) {
                                e1.children.forEach(e2 => {
                                    if (e2.children) {
                                        e2.children.forEach(e3 => {
                                            if (e3.areaCode == areaCode) {
                                                this.DELETE_DRILL_LINK('中国') // 先让drillLink回到初始值
                                                this.SET_DRILL_LINK({
                                                    optType: e1.orgType,
                                                    id: e1.orgCode,
                                                    name: e1.orgName
                                                })
                                                this.SET_DRILL_LINK({
                                                    optType: e2.cityType,
                                                    id: e2.cityCode,
                                                    name: e2.cityName
                                                })
                                                this.SET_DRILL_LINK({
                                                    optType: 5,
                                                    id: e3.areaCode,
                                                    name: e3.areaName
                                                })
                                                num = 1
                                                num1 = 1
                                                return; // 中断循环
                                            }
                                        })
                                    }
                                    if (num1 == 1) {
                                        return;
                                    }
                                })
                            }
                            if (num == 1) {
                                return;
                            }
                        });
                    }
                    break;
            }
        },
        // 初始化区域选择
        initAreaName (name) {
            let reg1 = /\((.+?)\)/g // 匹配小括号
            let reg2 = /\[(.+?)\]/g // 匹配中括号
            let reg3 = /\{(.+?)\}/g // 匹配大括号
            let areaType = reg1.exec(name)[1]
            let areaCode = reg2.exec(name)[1]
            let areaName = reg3.exec(name)[1]
            // console.log(areaType)
            // console.log(areaCode)
            // console.log(areaName)
            this.areaName = name
            switch (areaType) {
                case '0':
                    /**
                     * 如果是中国
                     */
                    this.provinceCode = null
                    this.cityCode = null
                    this.districtCode = null
                    this.handleCity(areaCode)
                    break;
                case '1':
                    /**
                     * 如果是省
                     */
                    this.handleCity(areaCode)
                    this.provinceCode = areaCode
                    this.cityCode = null
                    this.districtCode = null
                    break;
                case '2':
                    /**
                     * 如果是地市，需要找到它所属省遍历chinaArea来实现
                     */
                    // 找到所属省
                    let num = 0
                    this.getSysOrgList.forEach(e1 => {
                        if (e1.children && e1.children.length) {
                            e1.children.forEach(e2 => {
                                if (e2.cityCode == areaCode) {
                                    this.handleCity(e1.orgCode)
                                    this.handleDistrict(areaCode)
                                    this.provinceCode = e1.orgCode
                                    this.cityCode = areaCode
                                    this.districtCode = null
                                    num = 1
                                    return; // 中断循环
                                }
                            })
                        }
                        if (num == 1) {
                            return;
                        }
                    });
                    break;
                case '3':
                    /**
                     * 如果是直辖市
                     */
                    this.handleCity(areaCode)
                    this.provinceCode = areaCode
                    this.cityCode = null
                    this.districtCode = null
                    break;
                case '4':
                    /**
                     * 如果是区县，需要找到它所属市和省通过遍历chinaArea来实现
                     */
                    // 找所属的市id
                    // 找到所属省
                    {
                        let num = 0
                        this.getSysOrgList.forEach(e1 => {
                            if (e1.children && e1.children.length) {
                                e1.children.forEach(e2 => {
                                    if (e2.cityCode == areaCode) {
                                        this.handleCity(e1.orgCode)
                                        this.provinceCode = e1.orgCode
                                        this.cityCode = areaCode
                                        this.districtCode = null
                                        num = 1
                                        return; // 中断循环
                                    }
                                })
                            }
                            if (num == 1) {
                                return;
                            }
                        });
                    }
                    break;
                case '5':
                    /**
                     * 如果是区县，需要找到它所属市和省通过遍历chinaArea来实现
                     */
                    // 找所属的市id
                    // 找到所属省
                    {
                        let num = 0
                        let num1 = 0
                        this.getSysOrgList.forEach(e1 => {
                            if (e1.children && e1.children.length) {
                                e1.children.forEach(e2 => {
                                    if (e2.children) {
                                        e2.children.forEach(e3 => {
                                            if (e3.areaCode == areaCode) {
                                                this.handleCity(e1.orgCode)
                                                this.handleDistrict(e2.cityCode)
                                                this.provinceCode = e1.orgCode
                                                this.cityCode = e2.cityCode
                                                this.districtCode = areaCode
                                                num = 1
                                                num1 = 1
                                                return; // 中断循环
                                            }
                                        })
                                    }
                                    if (num1 == 1) {
                                        return;
                                    }
                                })
                            }
                            if (num == 1) {
                                return;
                            }
                        });
                    }
                    break;
            }
        }
    },
    watch: {
        // selectedName (val) {
        //     console.log('名字变化了', val)
        //     this.initAreaName(val)
        // }
    },
    mounted () {
        if (this.selectedName) {
            this.initAreaName(this.selectedName)
        }
        // echart-map组件下钻的时候触发
        this.$bus.$on('on-load-map', () => {
            // console.log('下钻了')
            this.initAreaName(this.selectedName)
        })
    }
}
</script>
<style lang="less" scoped>
.collapse-enter {
    height: 0px;
}
.area-select {
    height: 100%;
    position: relative;
    &-a {
        color: #3c97f8;
        font-weight: bold;
    }
    .ivu-dropdown {
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
        z-index: 100;
        .ivu-dropdown-menu {
            .item {
                display: flex;
                flex-wrap: wrap;
                width: 600px;
                border-bottom: 1px solid #e4e7eb;
                .ivu-dropdown-item {
                    user-select: none;
                    font-size: 14px!important;
                }
                .ivu-dropdown-item:hover {
                    background: none;
                    color: #3c97f8;
                    font-weight: bold;
                }
                .active {
                    color: #3c97f8;
                    font-weight: bold;
                }
            }
            .button {
                float: right;
                margin: 5px;
                .ivu-btn + .ivu-btn {
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>