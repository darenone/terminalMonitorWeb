<template>
    <div class="table-box">
        <Table stripe :columns="column" :data="data" disabled-hover></Table>
        <div class="page-box">
            <Page :current="page" :page-size="pageSize" :total="total" show-elevator show-sizer @on-change="changepage" @on-page-size-change="changepageSize" />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        columns: {
            type: Array,
            default () {
                return []
            }
        },
        data: {
            type: Array,
            default () {
                return []
            }
        },
        total: {
            type: Number,
            default: 0
        },
        // 判断是否需要展开
        expand: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        column () {
            if (this.expand) {
                this.columns.splice(1, 0, {
                    title: '序号',
                    align: 'center',
                    render: (h, params) => {
                        return h('span', params.index + (this.page - 1) * this.pageSize + 1)
                    }
                })
            } else {
                this.columns.unshift({
                    title: '序号',
                    align: 'center',
                    render: (h, params) => {
                        return h('span', params.index + (this.page - 1) * this.pageSize + 1)
                    }
                })
            }
            return this.columns
        }
    },
    data () {
        return {
            page: 1, // 当前页
            pageSize: 10, // 每页条数
        }
    },
    methods: {
        changepage (index) {
            let page = (index - 1) * this.pageSize
            this.$emit('changepage', page)
        },
        changepageSize (size) {
            this.$emit('changepageSize', size)
        }
    }
}
</script>
<style lang="less" scoped>
.table-box {
    margin: 10px 0;
}
.ivu-table-wrapper /deep/ .ivu-table {
    margin-top: 10px 0;
    background: none;
    border: 1px solid #112C59;
    border-bottom: none;
    &::before {
        background: #112C59;
    }
    th {
        background:#102B59;
        color: #c5c8ce;
        border: none;
        font-weight: 500;
    }
    tr:nth-child(2n) td {
        background: #0A1D3D;
    }
    td {
        background: none;
        border: none;
        color: #c5c8ce;
    }
    .ivu-table-body {
        overflow: hidden;
    }
}
.page-box /deep/ .ivu-page {
    margin-top: 10px;
    float: right;
    color: #c5c8ce;
    .ivu-page-prev {
        background: none;
        border: none;
        i {
            font-size: 18px;
            color: #c5c8ce;
        }
    }
    .ivu-page-next {
        background: none;
        border: none;
        i {
            font-size: 18px;
            color: #c5c8ce;
        }
    }
    .ivu-page-item {
        background: none;
        border: none;
        a {
            color: #c5c8ce;
        }
    }
    .ivu-page-item-active {
        border: none;
        background: #21509F;
    }
    .ivu-page-disabled {
        i {
            color: gray;
        }
    }
    .ivu-page-options {
        input {
            background: none;
            border: 1px solid #94AADC;
            color: #c5c8ce;
        }
    }
}
</style>