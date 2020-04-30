import Layout from '@/views/layout.vue'

export default [
    {
        path: '/',
        // name: 'home',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import('@/views/spread/index.vue'),
                meta: { title: '终端分布', show: true, id: '1', icon: 'iconfont icon-fenbu' },
            },
        ]
    },
    {
        path: '/analyse',
        // name: 'analyse',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import('@/views/analyse/index.vue'),
                meta: { title: '特性分析', show: true, id: '2', icon: 'iconfont icon-icon1' },
            },
        ]
    },
    {
        path: '/filter',
        // name: 'filter',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import('@/views/filter/index.vue'),
                meta: { title: '筛选管理', show: true, id: '3', icon: 'iconfont icon-shaixuan' },
            },
        ]
    },
    {
        path: '/setting',
        name: 'setting',
        component: Layout,
        meta: { title: '业务设置', show: true, id: '4', icon: 'iconfont icon-yewu' },
        children: [
            {
                path: 'block-set',
                name: 'blockSet',
                component: () => import('@/views/setting/block-set.vue'),
                meta: { title: '业务区块设置', show: true, id: '4-1', parentId: '4' },
            },
            {
                path: 'type-set',
                name: 'typeSet',
                component: () => import('@/views/setting/type-set.vue'),
                meta: { title: '业务类型设置', show: true, id: '4-2',  parentId: '4' },
            },
        ]
    },
    {
        path: '/details',
        // name: 'details',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import('@/views/details/index.vue'),
                meta: { title: '终端明细', show: true, id: '5', icon: 'iconfont icon-jiaoyimingxichaxun' },
            },
        ]
    },
    {
        path: '/system',
        name: 'system',
        component: Layout,
        meta: { title: '系统设置', show: true, id: '6', icon: 'iconfont icon-xitong' },
        children: [
            {
                path: 'terminal',
                component: () => import('@/views/system/terminal.vue'),
                meta: { title: '终端统计设置', show: true, id: '6-1', parentId: '6' },
            },
            {
                path: 'block-divide',
                component: () => import('@/views/system/block-divide.vue'),
                meta: { title: '区块划分规划设置', show: true, id: '6-2', parentId: '6' },
            },
            {
                path: 'terminal-type',
                component: () => import('@/views/system/terminal-type.vue'),
                meta: { title: '终端特性规划设置', show: true, id: '6-3', parentId: '6' },
            },
        ]
    }
]