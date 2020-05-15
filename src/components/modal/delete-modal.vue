<template>
    <Modal v-model="visible" width="360" :mask="false" @on-visible-change="modal_change">
        <p slot="header" style="color:#FA4B46;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>删除确认</span>
        </p>
        <div style="text-align:center">
            <p>删除后此条数据无法恢复</p>
            <p>是否继续删除?</p>
        </div>
        <div slot="footer">
            <Button class="button-custome3" type="error" size="large" long @click="del">确认删除</Button>
        </div>
    </Modal>
</template>
<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            visible: this.show
        }
    },
    methods: {
        del () {
            this.$emit('delete', false)
        },
        modal_change (val) {
            if (!val) {
                // 调动子组件formBox1里的方法
                // this.$emit('update:show', val)
            }
        },
    },
    watch: {
        show(newVal, oldVal) {
            this.visible = newVal
        }
    }
}
</script>