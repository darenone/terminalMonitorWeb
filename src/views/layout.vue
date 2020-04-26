<template>
    <div class="layout-wrapper">
        <Layout class="layout-outer">
            <Sider hide-trigger collapsible v-model="collapsed" breakpoint="sm" class="side-wrapper">
                <div v-if="!collapsed">
                    <div class="layout-logo">
                        <!-- <i class="iconfont icon-luyouqi" style="font-size: 18px;"></i> -->
                        <span>终端管理平台</span>
                    </div>
                    <div class="layout-nav">
                        <Menu ref="iMenu" class="menu-box" width="auto" theme="dark" :active-name="activeName" :open-names="openNames">
                            <template v-for="(item, index) in menuList">
                                <i-menu-item v-if="!item.children" :key="`menu_item_${index}`" :name="item.title" :to="item.path">{{item.title}}</i-menu-item>
                                <i-re-submenu v-else :key="`menu_item_${index}`" :parent="item"></i-re-submenu>
                            </template>
                        </Menu>
                    </div>
                </div>
                <div v-else>
                    <div class="layout-logo">
                        <i class="iconfont icon-luyouqi" style="font-size: 18px;"></i>
                    </div>
                    <template v-for="(item, index) in menuList">
                        <side-menu-dropdown v-if="item.children" :showTitle="false" :key="index" :parent="item"></side-menu-dropdown>
                        <Tooltip v-else transfer :content="item.title" placement="right" :key="index">
                            <a class="drop-menu-a">
                                <Icon type="ios-stats" size="20"/>
                            </a>
                        </Tooltip>
                    </template>
                </div>
            </Sider>
            <Layout class="main-wrapper">
                <Header>
                    <div class="header-left">
                        <Icon type="md-menu" @click="handleShow"/>
                    </div>
                    <div class="header-right"></div>
                </Header>
                <Content class="main-content">
                    <router-view/>
                </Content>
                <!-- <Footer>Footer</Footer> -->
            </Layout>
        </Layout>
    </div>
</template>
<script>
import iMenuComponents from '_c/iview-menu'
const { IMenuItem } = iMenuComponents
import IReSubmenu from '_c/iview-menu/i-resubmenu.vue'
import SideMenuDropdown from '_c/iview-menu/i-side-menu-dropdown.vue'
export default {
    components: {
        IMenuItem,
        IReSubmenu,
        SideMenuDropdown
    },
    data () {
        return {
            menuList: [],
            collapsed: false,
            activeName: '',
            openNames: []
        }
    },
    methods: {
        // 递归路由列表
        loopFun(list, index, path) {
            let arr = []
            index++
            list.forEach(e => {
                // console.log(e)
                if (e.meta) {
                    if (e.meta.show) {
                        if (e.children) {
                            let children = this.loopFun(e.children, index, e.path)
                            arr.push({
                                // path: e.path,
                                title: e.meta.title,
                                children: children,
                                // icon: e.meta.icon,
                                level: index
                            })
                        } else {
                            arr.push({
                                path: path ? path + '/' + e.path : e.path,
                                title: e.meta.title,
                                // icon: e.meta.icon,
                                level: index
                            })
                        }
                    }
                } else {
                    arr.push({
                        path: e.path,
                        title: e.children[0].meta.title,
                        // icon: e.meta.icon,
                        level: index
                    })
                }
            })
            return arr;
        },
        handleShow () {
            this.collapsed = !this.collapsed
        }
    },
    mounted () {
        this.menuList = this.loopFun(this.$router.options.routes, 0, '')
        this.$nextTick(() => {
            console.log(this.$route.meta.id)
            this.activeName = this.$route.meta.id || ''
            this.openNames = this.$route.meta.parentId ? [ this.$route.meta.parentId ] : []
        })
    },
    watch: {
        // $route (to, from) {
        //     this.activeName = to.meta.id || ''
        //     this.openNames = to.meta.parentId ? [ to.meta.parentId ] : []
        //     this.$nextTick(() => {
        //         this.$refs.iMenu.updateOpened()
        //         this.$refs.iMenu.updateActiveName()
        //     })
        // }
    }
}
</script>
<style lang="less" scoped>
.layout-wrapper {
    height: 100%;
    .layout-outer {
        height: 100%;
        .side-wrapper {
            // background:  #001529f5;
            .layout-logo {
                height: 64px;
                line-height: 64px;
                font-size: 1.4em;
                color: white;
                // font-weight: 600;
                // background: rgba(0, 40, 77, 1);
            }
            .ivu-tooltip, .drop-menu-a {
                width: 100%;
                display: block;
                text-align: center;
                padding: 5px 0;
            }
        }
        .main-wrapper {
            .ivu-layout-header {
                display: flex;
                justify-content: space-between;
                padding: 0 10px;
                .header-left {
                    font-size: 2em;
                    color: white;
                    cursor: pointer;
                }
            }
            .main-content {
                background: #05132A;
            }
        }
    }
}
</style>