<template>
    <div>
        <!-- <span id="count_up"></span> -->
        <slot name="left"></slot><span ref="number" :class="countClass" :id="eleId"></span><slot name="right"></slot>
    </div> 
</template>
<script>
import CountUp from 'countup'
// import './count-to.less'
export default {
    name: 'CountTo', // 在其它组件里可以获取这个组件的名字
    props: {
        /**
         * @description 启始值
         */
        startVal: {
           type: Number,
           default: 0, 
        },
        /**
         * @description 最终值
         */
        endVal: {
            type: Number,
            required: true
        },
        /**
         * @description 小数点后保留的位数
         */
        decimals: {
            type: Number,
            default: 0
        },
        /**
         * @description 渐变时长
         */
        duration: {
            type: Number,
            default: 1
        },
        /**
         * @description 是否使用变速效果
         */
        useEasing: {
            type: Boolean,
            default: false
        },
        /**
         * @description 设置数字分组 5,999 不分组5999
         */
        useGrouping: {
            type: Boolean,
            default: true
        },
        /**
         * @description 分组符号 5,999 5*999
         */
        separator: {
            type: String,
            default: ','
        },
        /**
         * @description 整数和小数分隔符号20.003
         */
        decimal: {
            type: String,
            default: '.'
        },
        /**
         * @description 动画延迟开始时间，单位为ms
         */
        delay:  {
            type: Number,
            default: 0
        },
        className: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            counter: {}
        }
    },
    computed: {
        eleId () {
            return `count_up_${this._uid}`
        },
        /**
         * @description
         * count-to-number 组件内部自己的class
         * this.className 调用组件时传入的class
         */
        countClass () {
            return [
                'count-to-number',
                this.className
            ]
        }
    },
    methods: {
        getCount () {
            // this.$refs.number 获取的是当前DOM span
            return this.$refs.number.innerText
        }
    },
    watch: {
        endVal (newVal, oldVal) {
            this.counter.update(newVal) // 调用counter实例里的方法，将更新后的值传入进去
            setTimeout(() => {
                this.$emit('on-animation-end', Number(this.getCount()))
            }, this.duration * 1000)
        }
    },
    mounted () {
        // 此生命周期钩子，在实例被创建和挂载到html上后触发
        // 此时只能确定挂载完成，但是不确定元素是否渲染完成，所以想要确保元素渲染完成就要使用this.$nextTick(),给它传一个回调函数
        this.$nextTick(() => {
            /**
             * @explain
             * new CountUp()创建CountUp实例
             * 此时元素的id=count_up,加入其它组件也有这个id，那么实例就会被其它组件公用，相互影响
             * 所以使用computed计算属性，设置id值
            */
            // const counter = new CountUp('count_up');
            this.counter = new CountUp(this.eleId, this.startVal, this.endVal, this.decimals, this.duration, {
                // 这个是配置对象
                useEasing: this.useEasing,
                useGrouping: this.useGrouping,
                separator: this.separator,
                decimal: this.decimal
            })
            setTimeout(() => {
                this.counter.start() // 调用new CountUp()实例下的方法
            }, this.delay)
        })
    }
}
</script>
<style lang="less">
@import './count-to.less';
</style>