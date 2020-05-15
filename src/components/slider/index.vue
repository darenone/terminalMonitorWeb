<template>
    <div class="slider-content" ref="slider">
        <div class="slider slider-left" :style="{ width: leftOffsetPercent }"></div>
        <div class="slider-trigger-icon1" :style="{ left: triggerLeft, width: `${triggerWidth}px` }">
            <i class="iconfont icon-jiantou" @mousedown="handleMouseDown"></i>
        </div>
        <div class="slider slider-middle" :style="{ left: leftOffsetPercent }"></div>
        <div class="slider-trigger-icon2">
            <i class="iconfont icon-jiantou"></i>
        </div>
        <div class="slider slider-right"></div>
    </div>
</template>
<script>
export default {
    props: {
        triggerWidth: {
            type: Number,
            default: 16
        },
        leftOffset: {
            type: Number,
            default: 0.5
        },
        range: {
            type: Array,
            default () {
                return [0.5, 0.5]
            }
        }
    },
    data () {
        return {
            canMove: false, // 鼠标弹起
            initOffset: 0, // 初始偏移量
        }
    },
    computed: {
        leftOffsetPercent () {
            console.log(this.range[0])
            return `${this.range[0] * 100}%`
        },
        triggerLeft () {
            return `calc(${(this.range[0] * 100)}% - ${this.triggerWidth / 2}px)`
        }
    },
    methods: {
        handleMouseDown (event) {
            document.addEventListener('mousemove', this.handleMouseMove)
            document.addEventListener('mouseup', this.handleMouseUp)
            // event.srcElement.getBoundingClientRect().left 小红条距离左侧的距离
            this.initOffset = event.pageX - event.srcElement.getBoundingClientRect().left
            this.canMove = true
        },
        handleMouseMove (event) {
            /** 
             * event.pageX 鼠标箭头距离页面左侧的距离（单位像素）
             * this.$refs.outer 获取到DOM对象
             * const object = this.$refs.outer.getBoundingClientRect() 调用DOM对象的方法，此方法返回一个对象,IE9也支持此方法
            */
           if (!this.canMove) return;
           const object = this.$refs.slider.getBoundingClientRect()
           let offsetPercent = (event.pageX - object.left - this.initOffset + this.triggerWidth / 2) / object.width
           if (offsetPercent < this.min) offsetPercent = this.min
           if (offsetPercent > this.max) offsetPercent = this.max
            // this.leftOffset = offsetPercent // 转化为% 子组件不能修改传入的值，通过事件让父组件修改
            // console.log(offsetPercent)
            this.$emit('update', offsetPercent)
        },
        handleMouseUp () { // 记录鼠标弹起事件
            this.canMove = false
        },
    },
    watch: {
        range (newVal, oldVal) {
            // console.log(newVal)
        }
    }
}
</script>