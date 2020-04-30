<template>
    <Row class="spread-contain">
        <Row type="flex" justify="center" align="middle">
            <Col span="8"><p class="title">洞见大数据平台终端分布</p></Col>
        </Row>
        <Row type="flex" justify="start" align="middle">
            <Col span="8">
                <div class="select-contain">
                    <span>业务区块视角：</span>
                    <Select v-model="block_value">
                        <Option v-for="item in block_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="select-contain">
                    <span>业务类型视角：</span>
                    <Select v-model="type_value">
                        <Option v-for="item in type_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </Col>
            <Col span="8">
                <Row>
                    <Col span="8">
                        <div class="count-contain">
                            <count-to class="number number1" :startVal="0" :endVal="10000"></count-to>
                            <p class="title">总终端数量（个）</p>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="count-contain">
                            <count-to class="number number2" :startVal="0" :endVal="10000"></count-to>
                            <p class="title">昨日日活量（个）</p>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="count-contain">
                            <count-to class="number number3" :startVal="0" :endVal="10000"></count-to>
                            <p class="title">当前在线量（个）</p>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col span="8">
                <drawer-box
                :styles="{ width: '300px', height: '740px'}">
                    <panel-box>
                        <template slot="title">
                            <i class="iconfont icon-fenbu"></i><span>终端各省分布</span>
                        </template>
                        <template slot="loadMore">
                            <a href="javascript:;">更多</a>
                        </template>
                        <template slot="content">
                            <table class="table-area" cellspacing="0">
                                <tr>
                                    <th>排名</th>
                                    <th>省份</th>
                                    <th>数量</th>
                                    <th>在线率</th>
                                </tr>
                                <tr v-for="(item, index) in clientList" :key="index">
                                    <td>{{ item.rank }}</td>
                                    <td>{{ item.areaName }}</td>
                                    <td>{{ item.num }}</td>
                                    <td>{{ item.rate | numFilter | emptyFilter }}</td>
                                </tr>
                            </table>
                        </template>
                    </panel-box>
                </drawer-box>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <e-map-drilldown
                :styles="{height: '700px'}">
                </e-map-drilldown>
            </Col>
        </Row>
        <Row type="flex" justify="space-between" class="row-box">
            <Col span="6">
                <panel-box>
                    <template slot="title">
                        <i class="iconfont icon-fenbu"></i><span>过去12个月终端重量趋势</span>
                    </template>
                    <template slot="content">
                        <echart-line1
                        :id="'echartLine1'"
                        :styles="{ height: '200px', width: '100%' }"
                        :data="series_line1"></echart-line1>
                    </template>
                </panel-box>
            </Col>
            <Col span="6">
                <panel-box>
                    <template slot="title">
                        <i class="iconfont icon-fenbu"></i><span>过去12个月终端重量趋势</span>
                        <template slot="content">

                        </template>
                    </template>
                </panel-box>
            </Col>
            <Col span="6">
                <panel-box>
                    <template slot="title">
                        <i class="iconfont icon-fenbu"></i><span>过去12个月终端重量趋势</span>
                        <template slot="content">

                        </template>
                    </template>
                </panel-box>
            </Col>
            <Col span="6">
                <panel-box>
                    <template slot="title">
                        <i class="iconfont icon-fenbu"></i><span>过去12个月终端重量趋势</span>
                        <template slot="content">

                        </template>
                    </template>
                </panel-box>
            </Col>
        </Row>
    </Row>
</template>
<script>
import countTo from '_c/count-to'
import drawerBox from '_c/Drawer'
import panelBox from '_c/panel'
import EMapDrilldown from '_c/echart-map-drilldown'
import echartLines from '_c/echart/echart-line'
const { echartLine1 } = echartLines
export default {
    components: { countTo, drawerBox, panelBox, EMapDrilldown, echartLine1 },
    data () {
        return {
            block_value: '',
            type_value: '',
            block_list: [
                { label: '北方五省', value: 1 },
                { label: '东北三省', value: 2 },
            ],
            type_list: [
                { label: 'ping拨测', value: 1 },
                { label: '网页拨测', value: 2 },
            ],
            clientList: [
                { rank: 1, areaName: '河南省', num: 100, rate: 30 },
                { rank: 2, areaName: '河南省', num: 100, rate: null },
                { rank: 3, areaName: '河南省', num: 100, rate: 30 },
                { rank: 4, areaName: '河南省', num: 100, rate: 30 },
                { rank: 5, areaName: '河南省', num: 100, rate: 30 },
                { rank: 6, areaName: '河南省', num: 100, rate: 30 }
            ],
            series_line1: [
                ['Mon', 100],
                ['Tue', 200],
                ['Wed', 200]
            ]
        }
    }
}
</script>