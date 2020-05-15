<template>
    <div class="select-input">
        <slot name="title"></slot>
        <!-- 单选 -->
        <Select v-if="!multiple" v-model="selectValue" @on-change="handleChange1" :label-in-value="true">
            <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <!-- 多选 -->
        <Select
        v-else
        v-model="selectValue"
        :multiple="multiple"
        :label-in-value="true"
        @on-change="handleChange">
            <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    </div>
</template>
<script>
import mixin from './mixin'
export default {
    props: {
        multiple: {
            type: Boolean,
            default () {
                return false
            }
        },
        value: {
            type: [ Array, String ],
            default () {
                return ''
            }
        },
        list: {
            type: Array,
            default () {
                return []
            }
        }
    },
    mixins: [ mixin ],
    data () {
        return {
            all_select_str: '',
            selectValue: this.value,
            lastSelectValue: [],
            selectedList: [],
            timer: false
        }
    },
    computed: {
        selectList () {
            // 多选-向list中添加-{ label: '全部', value: '' }
            if (this.multiple) {
                let list = Object.assign([], this.list)
                list.forEach((e, i) => {
                    if (i == list.length - 1) {
                        this.all_select_str += e.value
                    } else {
                        this.all_select_str += `${e.value},`
                    }
                })
                list.unshift({ label: '全部', value: this.all_select_str })
                return list
            } else {
                return this.list
            }
        },
    },
    methods: {
        // handleChange () {
        //     // console.log(this.val)
        // }
    },
    watch: {
        selectValue: {
            handler (newVal, oldVal) {
                const _this = this
                if (!this.timer) {
                    this.timer = true
                    setTimeout(function () {
                        _this.timer = false
                        let value = ''
                        let label = ''
                        _this.selectedList.forEach((e, i) => {
                            if (i == _this.selectedList.length - 1) {
                                value += e.value
                                label += e.label
                            } else {
                                value += `${e.value}_`
                                label += `${e.label}_`
                            }
                        })
                        _this.$emit('getValue', {
                            value,
                            label
                        })
                    }, 100)
                }
            }
        }
    }
}
</script>