<template>
    <Row class="spread-contain">
        <Row type="flex" justify="center" align="middle">
            <Col span="8"><p class="title">洞见大数据平台终端分布</p></Col>
        </Row>
        <Row type="flex" justify="start" align="middle">
            <Col span="8">
                <div class="select-contain">
                    <span>业务区块视角：</span>
                    <Select v-model="block_value">
                        <Option v-for="item in block_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="select-contain">
                    <span>业务类型视角：</span>
                    <Select v-model="type_value">
                        <Option v-for="item in type_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </Col>
            <Col span="8">
                <Row>
                    <Col span="8">
                        <div class="count-contain">
                            <count-to class="number number1" :startVal="0" :endVal="10000"></count-to>
                            <p class="title">总终端数量（个）</p>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="count-contain">
                            <count-to class="number number2" :startVal="0" :endVal="10000"></count-to>
                            <p class="title">昨日日活量（个）</p>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="count-contain">
                            <count-to class="number number3" :startVal="0" :endVal="10000"></count-to>
                            <p class="title">当前在线量（个）</p>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Row>
</template>
<script>
import countTo from '_c/count-to'
export default {
    components: { countTo },
    data () {
        return {
            block_value: '',
            type_value: '',
            block_list: [
                { label: '北方五省', value: 1 },
                { label: '东北三省', value: 2 },
            ],
            type_list: [
                { label: 'ping拨测', value: 1 },
                { label: '网页拨测', value: 2 },
            ]
        }
    }
}
</script>