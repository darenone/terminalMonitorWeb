import Home from '../views/Home.vue'
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
                meta: { title: '终端分布', show: true},
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
                meta: { title: '特性分析', show: true},
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
                meta: { title: '筛选管理', show: true},
            },
        ]
    },
    {
        path: '/setting',
        name: 'setting',
        component: Layout,
        meta: { title: '业务设置', show: true},
        children: [
            {
                path: 'block-set',
                name: 'blockSet',
                component: () => import('@/views/setting/block-set.vue'),
                meta: { title: '业务区块设置', show: true},
            },
            {
                path: 'type-set',
                name: 'typeSet',
                component: () => import('@/views/setting/type-set.vue'),
                meta: { title: '业务类型设置', show: true},
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
                meta: { title: '终端明细', show: true},
            },
        ]
    }
]