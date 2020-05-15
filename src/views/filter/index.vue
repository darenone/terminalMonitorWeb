<template>
    <Row class="filter-contain">
        <Col span="24"><p class="contain-title">筛选管理：ping拨测筛选器</p></Col>
        <Col span="24">
            <Row type="flex" justify="center" align="middle">
                <Col span="6">
                    <div class="sub-title">筛选器状态：<span class="color color1">筛选中</span>/<span class="color color2">筛选完成</span>/<span class="color color3">筛选失败</span></div>
                </Col>
                <Col span="5">
                    <div class="sub-title">可用终端数：<span class="color color4">123456789</span>个</div>
                </Col>
                <Col span="5">
                    <div class="sub-title">筛选目标终端数：<span class="color color4">123456789</span>个</div>
                </Col>
                <Col span="4">
                    <div class="sub-title">已筛选终端数：<span class="color color4">123456789</span>个</div>
                </Col>
                <Col span="4">
                    <Button class="button-custome1">刷新</Button>
                </Col>
            </Row>
        </Col>
        <Col span="24">
            <table-box :columns="columns1" :data="data1" :total="20" @changepage="changepage" @changepageSize="changepageSize"></table-box>
        </col>
    </Row>
</template>
<script>
import tableBox from '_c/table'
export default {
    components: { tableBox },
    data () {
        return {
            columns1: [
                {
                    title: '终端ID',
                    key: 'id',
                    align: 'center'
                },
                {
                    title: '所属区域',
                    key: 'area',
                    align: 'center'
                },
                {
                    title: '区块ID',
                    key: 'blockId',
                    align: 'center'
                },
                {
                    title: '所属运营商',
                    key: 'opt',
                    align: 'center'
                },
                {
                    title: 'CPU性能',
                    key: 'cpu',
                    align: 'center'
                },
                {
                    title: '平均在线时长',
                    key: 'time',
                    align: 'center'
                },
                {
                    title: '活跃度',
                    key: 'active',
                    align: 'center'
                },
                {
                    title: '测速带宽',
                    key: 'band',
                    align: 'center'
                },
                {
                    title: '接入方式',
                    key: 'style',
                    align: 'center'
                },
                {
                    title: '终端厂商类型',
                    key: 'type',
                    align: 'center'
                },
                {
                    title: '信号强度',
                    key: 'signal',
                    align: 'center'
                },
            ],
            data1: [
                { id: '00001', area: '四川省-成都市-武侯区', blockId: '00001', opt: '电信', cpu: '优', time: 12.1, active: '高', band: 200, style: '有线', type: '中兴', signal: '高' },
                { id: '00001', area: '四川省-成都市-武侯区', blockId: '00001', opt: '电信', cpu: '优', time: 12.1, active: '高', band: 200, style: '有线', type: '中兴', signal: '中' },
                { id: '00001', area: '四川省-成都市-武侯区', blockId: '00001', opt: '电信', cpu: '优', time: 12.1, active: '高', band: 200, style: '有线', type: '中兴', signal: '低' },
            ]
        }
    },
    methods: {
        changepage (start) {
            console.log(start)
        },
        changepageSize (length) {
            console.log(length)
        }
    }
}
</script>