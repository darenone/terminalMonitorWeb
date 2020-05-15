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
                        <i class="iconfont icon-fenbu"></i><span>过去12个月终端总量趋势</span>
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
                        <i class="iconfont icon-fenbu"></i><span>过去30天日活趋势</span>
                    </template>
                    <template slot="content">
                        <echart-line1
                        :id="'echartLine2'"
                        :styles="{ height: '200px', width: '100%' }"
                        :data="series_line2"></echart-line1>
                    </template>
                </panel-box>
            </Col>
            <Col span="6">
                <panel-box>
                    <template slot="title">
                        <i class="iconfont icon-fenbu"></i><span>过去24小时在线趋势</span>
                    </template>
                    <template slot="content">
                        <echart-line1
                        :id="'echartLine3'"
                        :styles="{ height: '200px', width: '100%' }"
                        :data="series_line3"></echart-line1>
                    </template>
                </panel-box>
            </Col>
            <Col span="6">
                <panel-box>
                    <template slot="title">
                        <i class="iconfont icon-fenbu"></i><span>版本分布占比</span>
                    </template>
                     <template slot="content">
                        <echart-line1
                        :id="'echartLine4'"
                        :styles="{ height: '200px', width: '100%' }"
                        :data="series_line4"></echart-line1>
                    </template>
                </panel-box>
            </Col>
        </Row>
        <Row type="flex" justify="space-between" class="row-box" style="margin: 10px 0;">
            <Col span="6">
                <panel-box>
                    <template slot="title">
                        <i class="iconfont icon-fenbu"></i><span>下载速率分布</span>
                    </template>
                    <template slot="content">
                        <echart-pie1
                        :id="'echartPie1'"
                        :styles="{ height: '200px', width: '100%' }"
                        :data="series_pie1"></echart-pie1>
                    </template>
                </panel-box>
            </Col>
            <Col span="6">
                <panel-box>
                    <template slot="title">
                        <i class="iconfont icon-fenbu"></i><span>终端活跃度分布</span>
                    </template>
                    <template slot="content">
                        <echart-pie1
                        :id="'echartPie2'"
                        :styles="{ height: '200px', width: '100%' }"
                        :data="series_pie2"></echart-pie1>
                    </template>
                </panel-box>
            </Col>
            <Col span="6">
                <panel-box>
                    <template slot="title">
                        <i class="iconfont icon-fenbu"></i><span>网络接入方式分布</span>
                    </template>
                    <template slot="content">
                        <echart-pie1
                        :id="'echartPie3'"
                        :styles="{ height: '200px', width: '100%' }"
                        :data="series_pie3"></echart-pie1>
                    </template>
                </panel-box>
            </Col>
            <Col span="6">
                <panel-box>
                    <template slot="title">
                        <i class="iconfont icon-fenbu"></i><span>厂商分布占比</span>
                    </template>
                     <template slot="content">
                        <echart-pie1
                        :id="'echartPie4'"
                        :styles="{ height: '200px', width: '100%' }"
                        :data="series_pie4"></echart-pie1>
                    </template>
                </panel-box>
            </Col>
        </Row>
        <Row type="flex" justify="space-between" class="row-box">
            <Col span="6">
                <panel-box>
                    <template slot="title">
                        <i class="iconfont icon-fenbu"></i><span>终端状态占比</span>
                    </template>
                    <template slot="content">
                        <echart-pie1
                        :id="'echartPie5'"
                        :styles="{ height: '200px', width: '100%' }"
                        :data="series_pie5"></echart-pie1>
                    </template>
                </panel-box>
            </Col>
            <Col span="6">
                <panel-box>
                    <template slot="title">
                        <i class="iconfont icon-fenbu"></i><span>CPU性能你分布</span>
                    </template>
                    <template slot="content">
                        <echart-pie1
                        :id="'echartPie6'"
                        :styles="{ height: '200px', width: '100%' }"
                        :data="series_pie6"></echart-pie1>
                    </template>
                </panel-box>
            </Col>
            <Col span="6">
                <panel-box>
                    <template slot="title">
                        <i class="iconfont icon-fenbu"></i><span>信号强度分布</span>
                    </template>
                    <template slot="content">
                        <echart-pie1
                        :id="'echartPie7'"
                        :styles="{ height: '200px', width: '100%' }"
                        :data="series_pie7"></echart-pie1>
                    </template>
                </panel-box>
            </Col>
            <Col span="6">
                <panel-box>
                    <template slot="title">
                        <i class="iconfont icon-fenbu"></i><span>运营商分布占比</span>
                    </template>
                     <template slot="content">
                        <echart-pie1
                        :id="'echartPie8'"
                        :styles="{ height: '200px', width: '100%' }"
                        :data="series_pie8"></echart-pie1>
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
import echartPies from '_c/echart/echart-pie'
const { echartPie1 } = echartPies
export default {
    components: { countTo, drawerBox, panelBox, EMapDrilldown, echartLine1, echartPie1 },
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
                ['1', 100],
                ['2', 200],
                ['3', 150],
                ['10', 150],
                ['12', 110]
            ],
            series_line2: [
                ['1', 100],
                ['2', 200],
                ['3', 150],
                ['4', 45],
                ['5', 110],
                ['6', 10],
                ['7', 30],
                ['8', 20]
            ],
            series_line3: [
                ['1', 100],
                ['2', 200],
                ['3', 150],
                ['4', 45],
                ['5', 110],
                ['6', 10],
                ['7', 30],
                ['8', 20]
            ],
            series_line4: [
                ['1', 100],
                ['2', 200],
                ['3', 150],
                ['4', 45],
                ['5', 110],
                ['6', 10],
                ['7', 30],
                ['8', 20]
            ],
            series_pie1: [
                { value: 40, name: '高' },
                { value: 30, name: '中' },
                { value: 20, name: '低' }
            ],
            series_pie2: [
                { value: 40, name: '高' },
                { value: 30, name: '中' },
                { value: 20, name: '低' }
            ],
            series_pie3: [
                { value: 40, name: '有线' },
                { value: 30, name: '无线' },
            ],
            series_pie4: [
                { value: 40, name: '小米' },
                { value: 30, name: '中兴' },
                { value: 30, name: '华为' },
            ],
            series_pie5: [
                { value: 40, name: '在线' },
                { value: 30, name: '离线' },
            ],
            series_pie6: [
                { value: 40, name: '高' },
                { value: 30, name: '中' },
                { value: 20, name: '低' }
            ],
            series_pie7: [
                { value: 40, name: '优' },
                { value: 30, name: '良' },
                { value: 20, name: '中' },
                { value: 20, name: '差' }
            ],
            series_pie8: [
                { value: 40, name: '电信' },
                { value: 30, name: '移动' },
                { value: 20, name: '联通' },
                { value: 20, name: '其它' }
            ]
        }
    }
}
</script>