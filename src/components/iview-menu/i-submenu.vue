<template>
    <Submenu :name="name">
        <template slot="title">
            <slot name="title"></slot>
        </template>
        <slot></slot>
    </Submenu>
</template>
<script>
export default {
    props: {
        name: {
            type: String,
            default: ''
        }
    }
}
</script>