<template>
    <Form class="form-box1" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
        <FormItem label="规则名称：" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入规则名称"></Input>
        </FormItem>
        <FormItem label="区块范围：" prop="range">
            <Select v-model="formValidate.range" placeholder="请选择区块范围">
                <Option value="1000">1000m</Option>
                <Option value="3000">3000m</Option>
                <Option value="10000">10000m</Option>
            </Select>
        </FormItem>
        <FormItem label="区县终端数下限值：" prop="area_min">
            <!-- <Input v-model="formValidate.area_min" placeholder="请输入区县终端数下限值"></Input> -->
            <Row type="flex" justify="start" align="middle" class="set-box">
                <Col span="5">
                    <Input v-model="formValidate.area_min" placeholder="请输入区县终端数下限值">
                        <span slot="append">个</span>
                    </Input>
                </Col>
                <Col span="19" class="remark">
                    <p><i class="iconfont icon-tishi"></i>低于该阈值的区县不进行网格区块划分</p>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="区县终端数上限值：" prop="area_max">
            <!-- <Input v-model="formValidate.area_max" placeholder="请输入区县终端数上限值"></Input> -->
            <Row type="flex" justify="start" align="middle" class="set-box">
                <Col span="5">
                    <Input v-model="formValidate.area_max" placeholder="请输入区县终端数上限值">
                        <span slot="append">个</span>
                    </Input>
                </Col>
                <Col span="19" class="remark">
                    <p><i class="iconfont icon-tishi"></i>当区县终端数高于该阈值时，系统将提醒重新划分区块</p>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="网格终端数下限值：" prop="block_min">
            <!-- <Input v-model="formValidate.block_min" placeholder="请输入网格终端数下限值"></Input> -->
            <Row type="flex" justify="start" align="middle" class="set-box">
                <Col span="5">
                    <Input v-model="formValidate.block_min" placeholder="请输入网格终端数下限值">
                        <span slot="append">个</span>
                    </Input>
                </Col>
                <Col span="19" class="remark">
                    <p><i class="iconfont icon-tishi"></i>网格区块中的终端数低于该值时，系统将在网格区块中提示用户，区块内终端过少</p>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="网格终端数上限值：" prop="block_max">
            <!-- <Input v-model="formValidate.block_max" placeholder="请输入网格终端数上限值"></Input> -->
            <Row type="flex" justify="start" align="middle" class="set-box">
                <Col span="5">
                    <Input v-model="formValidate.block_max" placeholder="请输入网格终端数上限值">
                        <span slot="append">个</span>
                    </Input>
                </Col>
                <Col span="19" class="remark">
                    <p><i class="iconfont icon-tishi"></i>网格区块中的终端数高于该值时，系统将在网格区块中提示用户，区块内终端过多</p>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="备注信息：">
            <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注信息..."></Input>
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
        return {
            formValidate: {
                name: '',
                range: '',
                area_min: 0,
                area_max: 0,
                block_min: 0,
                block_max: 0,
                remark: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入业务区块名称', trigger: 'blur' }
                ],
                range: [
                    { required: true, message: '请选择范围', trigger: 'change' }
                ],
                area_min: [
                    { required: true, message: '请输入区县终端数下限值', trigger: 'blur' }
                ],
                area_max: [
                    { required: true, message: '请输入区县终端数上限值', trigger: 'blur' }
                ],
                block_min: [
                    { required: true, message: '请输入网格终端数下限值', trigger: 'blur' }
                ],
                block_max: [
                    { required: true, message: '请输入网格终端数上限值', trigger: 'blur' }
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
                    })
                    this.handleReset(name)
                }
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