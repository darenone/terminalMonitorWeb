<template>
    <Row class="block-contain">
        <Col span="24"><p class="contain-title">业务类型设置</p></Col>
        <Col span="24" style="text-align: right;">
            <Button class="button-custome1" @click="modal1 = !modal1">新增</Button>
        </Col>
        <Col span="24">
            <table-box :columns="columns1" :data="data1" :total="20" @changepage="changepage" @changepageSize="changepageSize"></table-box>
        </col>
        <Modal
            v-model="modal1"
            title="新增/修改"
            :styles="{ width: '600px', top:'10%', }"
            :mask="false"
            :class-name="'form-box2'"
            @on-visible-change="modal_change"
            footer-hide>
            <form-box2 ref="formBox2" @ok="ok" @cancel="cancel"></form-box2>
        </Modal>
        <delete-modal :show="modal2" @delete="del"></delete-modal>
    </Row>
</template>
<script>
import tableBox from '_c/table'
import formBox2 from './form/form2.vue'
import modal1Boxs from '_c/modal'
let { deleteModal } = modal1Boxs
export default {
    components: { tableBox, formBox2, deleteModal },
    data () {
        return {
            columns1: [
                {
                    title: '业务类型名称',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '可用省份数',
                    key: 'province_num',
                    align: 'center'
                },
                {
                    title: '可用地市数',
                    key: 'city_num',
                    align: 'center'
                },
                {
                    title: '可用终端数',
                    key: 'terminal_num',
                    align: 'center'
                },
                {
                    title: '创建时间',
                    key: 'createTime',
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
                { name: 'ping拨测', province_num: 100, city_num: 100, terminal_num: 12345, createTime: new Date(), remark: '哈哈哈' },
                { name: 'ping拨测', province_num: 100, city_num: 100, terminal_num: 12345, createTime: new Date(), remark: '哈哈哈' },
                { name: 'ping拨测', province_num: 100, city_num: 100, terminal_num: 12345, createTime: new Date(), remark: '哈哈哈' },
                { name: 'ping拨测', province_num: 100, city_num: 100, terminal_num: 12345, createTime: new Date(), remark: '哈哈哈' }
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
                this.$refs.formBox2.handleReset('formValidate')
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
        },
    }
}
</script>
<style lang="less">
.form-box2 .ivu-modal {
        .ivu-modal-content {
            .ivu-modal-body {
                overflow: auto;
                @media screen and (min-width: 1600px) {
                    height: 600px;
                }
                // 大型设备（大台式电脑）
                @media (min-width: 1200px) and (max-width: 1600px) {
                     height: 500px;
                }
                // 中型设备 （台式电脑）
                @media screen and (max-width: 1200px) {
                    height: 400px;
                }
            }
        }
    }
/* 小型设备（平板电脑，768px 起） */
// @media screen and (min-width:768px) { ... }
/* 超小设备（手机，小于 768px） */
// @media screen and (min-width:480px){ ... }
</style>