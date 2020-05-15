<template>
    <Row class="analyse-contain">
        <Col span="24"><p class="contain-title">特性分析</p></Col>
        <Col span="24">
            <Row type="flex" justify="center" align="middle">
                <Col span="18">
                    <Row>
                        <Col span="8">
                            <select-input :multiple="true" :value="['T', 'O']" :list="list1" @getValue="getValue1"></select-input>
                        </Col>
                        <Col span="8">
                            <select-input :value="'1'" :list="list2" @getValue="getValue2"></select-input>
                        </Col>
                        <Col span="8">
                            <select-input></select-input>
                        </Col>
                        <Col span="8">
                            <select-input></select-input>
                        </Col>
                        <Col span="8">
                            <select-input></select-input>
                        </Col>
                        <Col span="8">
                            <select-input></select-input>
                        </Col>
                        <Col span="8">
                            <select-input></select-input>
                        </Col>
                        <Col span="8">
                            <select-input></select-input>
                        </Col>
                        <Col span="8">
                            <select-input></select-input>
                        </Col>
                    </Row>
                </Col>
                <Col span="6">
                    <Row>
                        <Col span="12">
                            <Button class="button-custome1">进入全国地图</Button>
                        </Col>
                        <Col span="12">
                            <Button class="button-custome2">重置</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
        <Col span="24">
            <table-box :columns="columns1" :data="data1" :total="20" @changepage="changepage" @changepageSize="changepageSize"></table-box>
        </col>
    </Row>
</template>
<script>
import selectInput from '_c/select-input'
import tableBox from '_c/table'
export default {
    components: { selectInput, tableBox },
    data () {
        return {
            list1: [
                { label: '电信', value: 'T' },
                { label: '移动', value: 'M' },
                { label: '联通', value: 'U' },
                { label: '其它', value: 'O' }
            ],
            list2: [
                { label: '河南', value: '1' },
                { label: '河北', value: '2' },
                { label: '安徽', value: '3' },
                { label: '上海', value: '4' }
            ],
            columns1: [
                {
                    title: '省份',
                    key: 'area',
                    align: 'center'
                },
                {
                    title: '终端总数',
                    key: 'terminal_num',
                    align: 'center'
                },
                {
                    title: '网格区块数',
                    key: 'grid_num',
                    align: 'center'
                },
                {
                    title: '平均CPU性能',
                    key: 'cpu',
                    align: 'center'
                },
                {
                    title: '平均活跃度',
                    key: 'active',
                    align: 'center'
                },
                {
                    title: '平均测速带宽',
                    key: 'band',
                    align: 'center'
                },
                {
                    title: '固网接入占比',
                    key: 'access',
                    align: 'center'
                },
                {
                    title: '平均信号强度',
                    key: 'signal',
                    align: 'center'
                },
                {
                    title: '过滤后终端数',
                    key: 'filter',
                    align: 'center'
                },
                {
                    title: '过滤后终端数占比',
                    key: 'filter_rate',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'operator',
                    align: 'center'
                }
            ],
            data1: [
                { area: '河南', terminal_num: 100, grid_num: 100, cpu: '高', active: '中', band: '低', access: 20.1, signal: '高', filter: 200, filter_rate: 2.1},
                { area: '河南', terminal_num: 100, grid_num: 100, cpu: '高', active: '中', band: '低', access: 20.1, signal: '高', filter: 200, filter_rate: 2.1},
                { area: '河南', terminal_num: 100, grid_num: 100, cpu: '高', active: '中', band: '低', access: 20.1, signal: '高', filter: 200, filter_rate: 2.1}
            ]
        }
    },
    methods: {
        getValue1 (value) {
            console.log(value)
        },
        getValue2 (value) {
            console.log(value)
        },
        changepage (start) {
            console.log(start)
        },
        changepageSize (length) {
            console.log(length)
        }
    }
}
</script>