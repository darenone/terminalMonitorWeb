<template>
    <div class="drawer-box">
        <transition name="slide-fade">
            <div v-show="show" class="drawer-contain" :style="styles">
                <div class="trun-off">
                    <i class="iconfont icon-arrow-right-copy-copy" @click="show = !show"></i>
                </div>
                <slot></slot>
            </div>
        </transition>
        <div v-show="!show" class="drawer-contain2" :style="styles">
            <div class="trun-on" @click="show = !show">
                <i class="iconfont icon-jiantou-copy"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        width: {
            type: [ String, Number ],
            default: ''
        },
        height: {
            type: [ String, Number ],
            default: ''
        },
        styles: {
            type: Object,
            default: ''
        }
    },
    data () {
        return {
            show: true
        }
    },
    methods: {
    }
}
</script>
<style lang="less">
.slide-fade-enter {
    transform: translateX(500px);
}
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all .5s ease
}
.slide-fade-leave-to {
  transform: translateX(500px);
}
</style>