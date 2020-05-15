<template>
    <Row class="details-contain">
        <Col span="24"><p class="contain-title">终端明细</p></Col>
        <Col span="24">
            <Row type="flex" justify="center" align="middle">
                <Col span="22">
                    <Row>
                        <Col span="5">
                            <select-input :multiple="true" :list="list1" @getValue="getValue1">
                                <span slot="title">运营商</span>
                            </select-input>
                        </Col>
                        <Col span="5">
                            <select-input :value="'1'" :list="list2" @getValue="getValue2">
                                <span slot="title">区域选择</span>
                            </select-input>
                        </Col>
                        <Col span="5">
                            <select-input>
                                <span slot="title">终端厂商</span>
                            </select-input>
                        </Col>
                        <Col span="4">
                            <select-input>
                                <span slot="title">终端版本</span>
                            </select-input>
                        </Col>
                        <Col span="5">
                            <select-input>
                                <span slot="title">CPU型号</span>
                            </select-input>
                        </Col>
                        <Col span="5">
                            <select-input>
                                <span slot="title">活跃度</span>
                            </select-input>
                        </Col>
                        <Col span="5">
                            <select-input>
                                <span slot="title">信号强度</span>
                            </select-input>
                        </Col>
                        <Col span="5">
                            <select-input>
                                <span slot="title">终端状态</span>
                            </select-input>
                        </Col>
                        <Col span="4">
                            <select-input>
                                <span slot="title">下载速率</span>
                            </select-input>
                        </Col>
                        <Col span="5">
                            <select-input>
                                <span slot="title">接入方式</span>
                            </select-input>
                        </Col>
                    </Row>
                </Col>
                <Col span="2">
                    <Row>
                        <Col span="24">
                            <Button class="button-custome1">进入全国地图</Button>
                        </Col>
                        <Col span="24">
                            <Button class="button-custome2">重置</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
        <Col span="24">
            <table-box :columns="columns1" :data="data1" :total="20" @changepage="changepage" @changepageSize="changepageSize"></table-box>
        </col>
        <Modal
            v-model="modal1"
            title="终端详情"
            :styles="{ width: '600px', top:'10%' }"
            :mask="false"
            footer-hide>
            <Row>
                <Col span="12">
                    <p class="details-box"><span class="title">终端ID：</span>0010000002</p>
                </Col>
                <Col span="12">
                    <p class="details-box"><span class="title">所在区块：</span>0010002</p>
                </Col>
                <Col span="12">
                    <p class="details-box"><span class="title">IP地址：</span>192.168.1.23</p>
                </Col>
                <Col span="12">
                    <p class="details-box"><span class="title">CPU性能：</span>高</p>
                </Col>
                <Col span="12">
                    <p class="details-box"><span class="title">所在地：</span>四川省成都市武侯区</p>
                </Col>
                <Col span="12">
                    <p class="details-box"><span class="title">活跃度：</span>高</p>
                </Col>
                <Col span="12">
                    <p class="details-box"><span class="title">运营商：</span>电信</p>
                </Col>
                <Col span="12">
                    <p class="details-box"><span class="title">网络接入方式：</span>WIFI</p>
                </Col>
                <Col span="12">
                    <p class="details-box"><span class="title">MAC地址：</span>0010002</p>
                </Col>
                <Col span="12">
                    <p class="details-box"><span class="title">信号强度：</span>0010002</p>
                </Col>
                <Col span="12">
                    <p class="details-box"><span class="title">终端厂商：</span>0010002</p>
                </Col>
                <Col span="12">
                    <p class="details-box"><span class="title">状态：</span>0010002</p>
                </Col>
                <Col span="12">
                    <p class="details-box"><span class="title">终端类型：</span>0010002</p>
                </Col>
                <Col span="12">
                    <p class="details-box"><span class="title">版本号：</span>0010002</p>
                </Col>
            </Row>
        </Modal>
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
                    title: '终端ID',
                    key: 'id',
                    align: 'center'
                },
                {
                    title: 'MAC地址',
                    key: 'mac',
                    align: 'center'
                },
                {
                    title: 'IP地址',
                    key: 'ip',
                    align: 'center'
                },
                {
                    title: '终端状态',
                    key: 'status',
                    align: 'center'
                },
                {
                    title: '查看',
                    key: 'operator',
                    align: 'center',
                    render: (h, {row}) => {
                        return h('div', [
                            h('a', {
                                class: {
                                    'iconfont': true,
                                    'icon-xiangqing': true
                                },
                                style: {
                                    fontSize: '14px',
                                    color: '#45C937'
                                },
                                on: {
                                    click: () => {
                                        this.modal1 = !this.modal1
                                        // this.$router.push({
                                        //     path: "/taskSet/create",
                                        //     query: {
                                        //         task_id: row.taskId
                                        //     }
                                        // })
                                        // localStorage.setItem("task_id", row.task_id);
                                    }
                                }
                            }, '查看')
                        ])
                    }
                }
            ],
            data1: [
                { id: '000100010001', mac: '02-03-04-E0', ip: '192.168.1.23', status: '在线'},
                { id: '000100010001', mac: '02-03-04-E0', ip: '192.168.1.23', status: '在线'},
                { id: '000100010001', mac: '02-03-04-E0', ip: '192.168.1.23', status: '在线'}
            ],
            modal1: false
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