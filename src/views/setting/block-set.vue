<template>
    <Row class="block-contain">
        <Col span="24"><p class="contain-title">业务区块设置</p></Col>
        <Col span="24" style="text-align: right;">
            <Button class="button-custome1" @click="modal1 = !modal1">新增</Button>
        </Col>
        <Col span="24">
            <table-box :columns="columns1" :data="data1" :total="20" @changepage="changepage" @changepageSize="changepageSize"></table-box>
        </col>
        <Modal
            v-model="modal1"
            title="新增/修改"
            :styles="{ width: '600px', top:'10%' }"
            :mask="false"
            @on-visible-change="modal_change"
            footer-hide>
            <form-box1 ref="formBox1" @ok="ok" @cancel="cancel"></form-box1>
        </Modal>
        <delete-modal :show="modal2" @delete="del"></delete-modal>
    </Row>
</template>
<script>
import tableBox from '_c/table'
import formBox1 from './form/form1.vue'
import modal1Boxs from '_c/modal'
let { deleteModal } = modal1Boxs
export default {
    components: { tableBox, formBox1, deleteModal },
    data () {
        return {
            columns1: [
                {
                    title: '业务区块名称',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '业务区块等级',
                    key: 'level',
                    align: 'center'
                },
                {
                    title: '区块数量',
                    key: 'block_num',
                    align: 'center'
                },
                {
                    title: '终端数',
                    key: 'terminal_num',
                    align: 'center'
                },
                {
                    title: '创建时间',
                    key: 'create_time',
                    align: 'center'
                },
                {
                    title: '备注',
                    key: 'remark',
                    align: 'center'
                },
                {
                    title: '操作',
                    align: 'center',
                    width: '220',
                    render: (h, {row}) => {
                        return h('div', [
                            h('a', {
                                class: {
                                    'iconfont': true,
                                    'icon-xiugai': true
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
                            }, '修改'),
                            h('a', {
                                class: {
                                    'iconfont': true,
                                    'icon-shanchu': true
                                },
                                style: {
                                    fontSize: '14px',
                                    padding: '0 10px',
                                    color: '#FA4B46'
                                },
                                on: {
                                    click: () => {
                                        this.modal2 = !this.modal2
                                        // this.$router.push({
                                        //     path: "/taskSet/create",
                                        //     query: {
                                        //         task_id: row.taskId
                                        //     }
                                        // })
                                        // localStorage.setItem("task_id", row.task_id);
                                    }
                                }
                            }, '删除'),
                            h('a', {
                                class: {
                                    'iconfont': true,
                                    'icon-fenbu': true
                                },
                                style: {
                                    fontSize: '14px',
                                    color: '#E6AA1E'
                                },
                                on: {
                                    click: () => {
                                        // this.$router.push({
                                        //     path: "/taskQuery/mapOverview",
                                        //     query: {
                                        //         task_id: row.taskId
                                        //     }
                                        // })
                                    }
                                }
                            }, '地图查看')
                        ])
                    }
                },
            ],
            data1: [
                { name: '北方五省', level: '省级', block_num: 100, terminal_num: 123456, create_time: '2020-02-11 13:50', remark: '哈哈' },
                { name: '北方五省', level: '省级', block_num: 100, terminal_num: 123456, create_time: '2020-02-11 13:50', remark: '哈哈' },
                { name: '北方五省', level: '省级', block_num: 100, terminal_num: 123456, create_time: '2020-02-11 13:50', remark: '哈哈' },
                { name: '北方五省', level: '省级', block_num: 100, terminal_num: 123456, create_time: '2020-02-11 13:50', remark: '哈哈' },
            ],
            modal1: false,
            modal2: false
        }
    },
    methods: {
        changepage (start) {
            console.log(start)
        },
        changepageSize (length) {
            console.log(length)
        },
        modal_change (val) {
            if (!val) {
                // 调动子组件formBox1里的方法
                this.$refs.formBox1.handleReset('formValidate')
            }
        },
        ok (obj) {
            this.modal1 = false
            console.log(obj)
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.modal1 = false
            this.$Message.info('Clicked cancel');
        },
        del () {
            this.modal2 = false
        }
    }
}
</script>