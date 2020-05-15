<template>
    <section style="width: 100%;height: 100%;">
        <div :id="id" ref="chartPie" v-show="!nodata" :style="styles"></div>
        <div v-show="nodata"  class="no-data" :style="styles">
            <img src="@/assets/img/nodata/pie_nodata.png" alt="">
        </div>
    </section>
</template>
<script>
import echarts from 'echarts'
import formatOption from './config'
export default {
    props: {
        id: {
            type: String,
            default: ""
        },
        styles: {
            type: Object,
            default () {
                return {}
            }
        },
        data: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            nodata: false,
            screenWidth: document.body.clientWidth,
        }
    },
    computed: {
        myChart() {
            return echarts.init(document.getElementById(this.id));
        }
    },
    methods: {
        renderLine() {
            this.$nextTick(() => {
                let option = formatOption(this.data)
                // console.log(option)
                // console.log(this.myChart)
                // this.charNode = echarts.init(document.getElementById(this.id))
                if (this.myChart) {
                    // console.log(this.myChart)
                    this.myChart.clear()
                    this.myChart.setOption(option)
                    // window.addEventListener("resize", () => { this.myChart.resize();});
                }
            })
        }
    },
    mounted () {
        const _this = this
        if (this.data.length) {
            this.renderLine()
        } else {
            this.nodata = true
        }
        // mounted执行时，挂载window.onresize方法
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                _this.screenWidth = window.screenWidth
            })
        }
    },
    watch: {
        screenWidth (val) {
            // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
            const _this = this
            if (!this.timer) {
                this.screenWidth = val
                this.timer = true
                setTimeout(function () {
                    _this.timer = false
                    console.log(_this.screenWidth)
                }, 1000)
            }
        },
        data: {
            handler(newVal, oldVal) {
                if (newVal && newVal.length) {
                    console.log(newVal)
                } else {
                    this.nodata = true
                    console.log(this.nodata)
                }
            }
        }
    },
    destroyed() {
        window.onresize = null; // 组件被销毁后解除挂载
    },
}
</script>