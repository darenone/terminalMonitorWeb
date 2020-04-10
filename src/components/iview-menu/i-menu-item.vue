<template>
    <MenuItem :name="name" :to="to">
        <slot></slot>
    </MenuItem>
</template>
<script>
export default {
    props: {
        name: {
            type: String,
            default: ''
        },
        to: {
            String: String,
            default: ''
        }
    }
}
</script>