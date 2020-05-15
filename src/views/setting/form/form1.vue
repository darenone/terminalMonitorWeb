<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">
        <FormItem label="业务区块名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入业务区块名称"></Input>
        </FormItem>
        <FormItem label="业务区块等级" prop="city">
            <Select v-model="formValidate.city" placeholder="请选择业务区块等级">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="区块选择" prop="block">
            <Transfer
                :data="data1"
                :target-keys="targetKeys1"
                :render-format="render"
                :titles="titles"
                @on-change="onChange"></Transfer>
        </FormItem>
        <FormItem label="备注">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注..."></Input>
        </FormItem>
        <FormItem style="text-align: right;">
            <Button class="button-custome2" @click="handleReset('formValidate')" style="margin-right: 10px;">取消</Button>
            <Button class="button-custome1" @click="handleSubmit('formValidate')">确认</Button>
        </FormItem>
    </Form>
</template>
<script>
export default {
    data () {
        let _this = this
        const validateBlock = (rule, value, callback) => {
            if (!_this.targetKeys1.length) {
                callback(new Error('请选择区块'))
            } else {
                callback();
            }
        }
        return {
            formValidate: {
                name: '',
                city: '',
                desc: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入业务区块名称', trigger: 'blur' }
                ],
                city: [
                    { required: true, message: '请选择业务等级', trigger: 'change' }
                ],
                block: [
                    { required: true, validator: validateBlock, trigger: 'change' },
                ],
            },
            data1: [
                { "key": "1", "label": "Content 1", "disabled": false },
                { "key": "2", "label": "Content 2", "disabled": false },
                { "key": "3", "label": "Content 3", "disabled": false }
            ],
            targetKeys1: [],
            titles: ['可选区块', '已选区块']

        }
    },
    methods: {
        render (item) {
            return item.key + ':' + item.label;
        },
        onChange (newTargetKeys) {
            this.targetKeys1 = newTargetKeys;
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$emit('ok', {
                        ...this.formValidate,
                        block: this.targetKeys1
                    })
                }
                this.handleReset(name)
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields()
            this.targetKeys1 = []
            this.$emit('cancel')
        }
    }
}
</script>