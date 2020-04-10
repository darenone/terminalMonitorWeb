<template>
    <i-submenu :name="parent.title">
        <template slot="title">
            <!-- <Icon type="ios-filing" /> -->
            {{ parent.title }}
        </template>
        <template v-for="(item, index) in parent.children">
            <i-menu-item v-if="!item.children" :key="`menu_item_${index}`" :name="item.title" :to="item.path">{{item.title}}</i-menu-item>
            <i-re-submenu v-else :key="`menu_item_${index}`" :hello="item"></i-re-submenu>
        </template>
    </i-submenu>
</template>
<script>
import iMenuComponents from '_c/iview-menu'
const { IMenuItem, ISubmenu } = iMenuComponents
export default {
    name: 'IReSubmenu', // 很关键，必须要写，写了才能组件调用自身实现递归
    components: {
        ISubmenu,
        IMenuItem
    },
    props: {
        parent: {
            type: Object,
            default: () => {
                return {}
            }
        },
    },
    data () {
        return {


        }
    }
}
</script>