<template>
    <div class="panel-box">
        <div class="panel-title">
            <div class="title-left">
                <slot name="title"></slot>
            </div>
            <div class="title-right">
                <slot name="loadMore"></slot>
            </div>
        </div>
        <div class="panel-contain">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        width: {
            type: String,
            default: ''
        },
        height: {
            type: String,
            default: ''
        }
    }
}
</script>