<template>
    <Row class="block-contain">
        <Col span="24"><p class="contain-title">区块设置</p></Col>
        <Col span="24" style="text-align: right;">
            <Button class="button-custome1" @click="modal1 = !modal1">新增</Button>
        </Col>
        <Col span="24">
            <table-box :expand="true" :columns="columns1" :data="data1" :total="20" @changepage="changepage" @changepageSize="changepageSize"></table-box>
        </col>
        <Modal
            v-model="modal1"
            title="新建规则"
            :styles="{ width: '60%', top:'10%' }"
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
import tabelExpand from './expand'
import modal1Boxs from '_c/modal'
let { deleteModal } = modal1Boxs
export default {
    components: { tableBox, deleteModal, formBox1 },
    data () {
        return {
            columns1: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, {row}) => {
                        return h(tabelExpand, {
                            props: {
                                row: row.detail
                            }
                        })
                    }
                },
                {
                    title: '规则名称',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '生效区县数',
                    key: 'num',
                    align: 'center'
                },
                {
                    title: '基本区块范围',
                    key: 'range',
                    align: 'center'
                },
                {
                    title: '区县终端数下限值',
                    key: 'area_min',
                    align: 'center'
                },
                {
                    title: '区县终端数上限值',
                    key: 'area_max',
                    align: 'center'
                },
                {
                    title: '网格终端数下限值',
                    key: 'block_min',
                    align: 'center'
                },
                {
                    title: '网格终端数上限值',
                    key: 'block_max',
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
                    width: '150',
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
                            }, '删除')
                        ])
                    }
                },
            ],
            data1: [
                { name: '新建规则1', num: 100, range: 1000, area_min: 10, area_max: 20, block_min: 1000, block_max: 1000, remark: '哈哈' },
                { name: '新建规则1', num: 100, range: 1000, area_min: 10, area_max: 20, block_min: 1000, block_max: 1000, remark: '哈哈' },
                { name: '新建规则1', num: 100, range: 1000, area_min: 10, area_max: 20, block_min: 1000, block_max: 1000, remark: '哈哈' },
                { name: '新建规则1', num: 100, range: 1000, area_min: 10, area_max: 20, block_min: 1000, block_max: 1000, remark: '哈哈' }
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
            // this.modal1 = false
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