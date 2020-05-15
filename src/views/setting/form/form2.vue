<template>
    <Form ref="formValidate" 
        :model="formValidate" 
        :rules="ruleValidate"
        :label-width="110"
        class="form-box2">
        <FormItem label="业务类型名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入业务区块名称"></Input>
        </FormItem>
        <FormItem label="终端数条件" prop="city">
            <div class="select-contain form-radio">
                <Checkbox v-model="province_radio"></Checkbox>
                <span>省级终端数高于</span>
                <Input v-model="province_value" style="margin-left: 5px;width: 70%;">
                    <span slot="append">个</span>
                </Input>
            </div>
            <div class="select-contain form-radio">
                <Checkbox v-model="city_radio"></Checkbox>
                <span>地市终端数高于</span>
                <Input v-model="city_value" style="margin-left: 5px;width: 70%;">
                    <span slot="append">个</span>
                </Input>
            </div>
            <div class="select-contain form-radio">
                <Checkbox v-model="area_radio"></Checkbox>
                <span>区县终端数高于</span>
                <Input v-model="area_value" style="margin-left: 5px;width: 70%;">
                    <span slot="append">个</span>
                </Input>
            </div>
        </FormItem>
        <FormItem label="区域范围设置" prop="block">
            <Transfer
                :data="data1"
                :target-keys="targetKeys1"
                :render-format="render"
                :titles="titles"
                @on-change="onChange"></Transfer>
        </FormItem>
        <FormItem label="参数配置">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注..."></Input>
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
            titles: ['可选区块', '已选区块'],
            province_radio: false,
            city_radio: false,
            area_radio: false,
            province_value: 0,
            city_value: 0,
            area_value: 0,
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
<style lang="less" scoped>
.form-box2 {
    .form-radio {
        padding: 0;
        + .form-radio {
            padding-top: 10px;
        }
    }
}
</style>
