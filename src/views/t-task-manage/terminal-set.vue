<template>
    <Row>
        <Col span="24">
            <div class="title">
                <span>洞见大数据平台终端分布</span>
            </div>
        </Col>
        <Col span="24">
            <div class="data">
            </div>
        </Col>
        <Col span="24">
            <div class="map">
                <e-map-drilldown></e-map-drilldown>
            </div> 
        </Col>
    </Row>
</template>
<script>
import EMapDrilldown from '_c/ehcart-map-drilldown'
export default {
    components: { EMapDrilldown },
}
</script>
<style lang="less" scoped>
.map {
    height: 500px;
    width: 80%;
    margin: 0 auto;
}
</style>