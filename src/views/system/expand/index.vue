<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="8">
                <span class="expand-key">终端IP : </span>
                <span class="expand-value">{{ detail.ip}}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">终端MAC: </span>
                <span class="expand-value">{{ detail.mac }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">探针ID: </span>
                <span class="expand-value">{{ detail.probeId }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">Ping地址: </span>
                <span class="expand-value">{{ detail.url }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">Ping包大小: </span>
                <span class="expand-value">{{ detail.pingByte }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">已发送: </span>
                <span class="expand-value">{{ detail.packetSend }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">已接收: </span>
                <span class="expand-value">{{ detail.packetRecept }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">丢失: </span>
                <span class="expand-value">{{ detail.lostNum }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">丢包率: </span>
                <span class="expand-value">{{ detail.lostRate }}%</span>
            </Col>
            <Col span="8">
                <span class="expand-key">最长时延: </span>
                <span class="expand-value">{{ detail.maxDelayTime }}ms</span>
            </Col>
            <Col span="8">
                <span class="expand-key">最短时延: </span>
                <span class="expand-value">{{ detail.minDelayTime }}ms</span>
            </Col>
            <Col span="8">
                <span class="expand-key">平均时延: </span>
                <span class="expand-value">{{ detail.avgDelayTime }}ms</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        },
        data() {
            return {
                detail: {}
            }
        },
        watch: {
            row: {
                handler(newVal, oldVal) {
                    this.detail = newVal;
                },
                deep: true
            }
        },
    };
</script>