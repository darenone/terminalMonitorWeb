<template>
    <Row class="block-contain">
        <Col span="24"><p class="contain-title">终端特性规划设置</p></Col>
        <Col span="24">
            <p class="contain-subTitle">
                <i class="iconfont icon-xitong"></i>CPU性能设置：
                <span><i class="iconfont icon-tishi"></i>终端数及终端各项参数的更新频率</span>
            </p>
        </Col>
        <Col span="24">
            <Row type="flex" justify="start">
                <Col span="8" style="text-align: left;">
                    <div class="select-contain">
                        <span slot="name">高性能：</span>
                        <select-input :multiple="true" :value="[]" :list="list1" @getValue="getValue1"></select-input>
                        <Dropdown trigger="click" style="margin-left: 20px">
                            <a href="javascript:void(0)">
                                <i class="iconfont icon-xinzeng"></i>
                            </a>
                            <DropdownMenu slot="list">
                                <Transfer
                                    :data="data1"
                                    :target-keys="targetKeys1"
                                    :render-format="render"
                                    :titles="titles"
                                    @on-change="onChange"></Transfer>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Col>
                <Col span="8" style="text-align: left;">
                    <div class="select-contain">
                        <span slot="name">中性能：</span>
                        <select-input :multiple="true" :value="[]" :list="list1" @getValue="getValue1"></select-input>
                        <Dropdown trigger="click" style="margin-left: 20px">
                            <a href="javascript:void(0)">
                                <i class="iconfont icon-xinzeng"></i>
                            </a>
                            <DropdownMenu slot="list">
                                <Transfer
                                    :data="data1"
                                    :target-keys="targetKeys1"
                                    :render-format="render"
                                    :titles="titles"
                                    @on-change="onChange"></Transfer>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Col>
                <Col span="8" style="text-align: left;">
                    <div class="select-contain">
                        <span slot="name">低性能：</span>
                        <select-input :multiple="true" :value="[]" :list="list1" @getValue="getValue1"></select-input>
                        <Dropdown trigger="click" style="margin-left: 20px">
                            <a href="javascript:void(0)">
                                <i class="iconfont icon-xinzeng"></i>
                            </a>
                            <DropdownMenu slot="list">
                                <Transfer
                                    :data="data1"
                                    :target-keys="targetKeys1"
                                    :render-format="render"
                                    :titles="titles"
                                    @on-change="onChange"></Transfer>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Col>
            </Row>
        </Col>
        <Col span="24">
            <p class="contain-subTitle">
                <i class="iconfont icon-xitong"></i>信号强度设置：
                <span><i class="iconfont icon-tishi"></i>无线接入的终端收到的无线信号强度</span>
            </p>
        </Col>
        <Col span="24">
            <slider-box :leftOffset="leftOffset" @update="handleUpdate" :range="range"></slider-box>
        </Col>
        <Col span="24">
            <p class="contain-subTitle">
                <i class="iconfont icon-xitong"></i>下载速率设置：
                <span><i class="iconfont icon-tishi"></i>终端平均下载速率大小</span>
            </p>
        </Col>
        <Col span="24">
            <slider-box></slider-box>
        </Col>
        <Col span="24">
            <p class="contain-subTitle">
                <i class="iconfont icon-xitong"></i>活跃度设置：
                <span><i class="iconfont icon-tishi"></i>过去30天内终端的上线天数</span>
            </p>
        </Col>
        <Col span="24">
            <slider-box></slider-box>
        </Col>
    </Row>
</template>
<script>
import selectInput from '_c/select-input'
import sliderBox from '_c/slider'
export default {
    components: { selectInput, sliderBox },
    data () {
        return {
            list1: [
                { label: '电信', value: 'T' },
                { label: '移动', value: 'M' },
                { label: '联通', value: 'U' },
                { label: '其它', value: 'O' }
            ],
            data1: [
                { "key": "1", "label": "Content 1", "disabled": false },
                { "key": "2", "label": "Content 2", "disabled": false },
                { "key": "3", "label": "Content 3", "disabled": false }
            ],
            targetKeys1: [],
            titles: ['可选区块', '已选区块'],
            leftOffset: 0.2,
            range: [0.3, 0.3]
        }
    },
    methods: {
        getValue1 (value) {
            console.log(value)
        },
        render (item) {
            return item.key + ':' + item.label;
        },
        onChange (newTargetKeys) {
            this.targetKeys1 = newTargetKeys;
        },
        handleUpdate (val) {
            this.range[0] = val
            console.log(this.range)
        }
    }
}
</script>