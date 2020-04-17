<template>
    <div class="">过滤设置</div>
</template>
<script>
import { get_planDetailListByUser } from '@/api/index'
export default {
    data () {
        return {

        }
    },
    methods: {
        async_get_planDetailListByUser (params) {
            get_planDetailListByUser(params).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mounted () {
        // this.async_get_planDetailListByUser({
        //     taskId: 10000056
        // })
    }
}
</script>