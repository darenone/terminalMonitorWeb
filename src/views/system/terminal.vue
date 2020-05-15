<template>
    <Row class="terminal-contain">
        <Col span="24"><p class="contain-title">终端统计</p></Col>
        <Col span="24">
            <Row type="flex" justify="start" align="middle" class="set-box">
                <Col span="4" class="title">
                    <span>终端参数统计更新周期：</span>
                </Col>
                <Col span="4">
                    <Input v-model="value">
                        <span slot="append">天</span>
                    </Input>
                </Col>
                <Col span="6" class="remark">
                    <p><i class="iconfont icon-tishi"></i>终端数及终端各项参数的更新频率</p>
                </Col>
            </Row>
            <Row type="flex" justify="start" align="middle" class="set-box">
                <Col span="4" class="title">
                    <span>终端失效时间：</span>
                </Col>
                <Col span="4">
                    <Input v-model="value">
                        <span slot="append">天</span>
                    </Input>
                </Col>
                <Col span="6" class="remark">
                    <p><i class="iconfont icon-tishi"></i>终端持续一段时间未上线，视为无效终端</p>
                </Col>
            </Row>
        </Col>
    </Row>
</template>
<script>
export default {
    data () {
        return {
            value: ''
        }
    }
}
</script>