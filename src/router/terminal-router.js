import Home from '../views/Home.vue'
import Layout from '@/views/layout.vue'

export default [
    {
        path: '/',
        redirect: '/task-manage'
        // name: 'Home',
        // component: Layout
    },
    // {
    //     path: '/about',
    //     name: 'About',
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // },
    {
        path: '/task-manage',
        name: 'taskManage',
        meta: {
            title: '任务管理设置',
            show: true
        },
        component: Layout,
        redirect: '/task-manage/terminal-set',
        children: [
            {
                path: 'terminal-set',
                name: 'terminalSet',
                meta: {
                    title: '终端分布',
                    show: true
                },
                component: () => import('@/views/t-task-manage/terminal-set.vue'),
            },
            {
                path: 'system-set',
                name: 'systemSet',
                meta: {
                    title: '系统设置',
                    show: true
                },
                component: () => import('@/views/t-task-manage/system-set.vue'),
            },
            {
                path: 'filter-set',
                name: 'filterSet',
                meta: {
                    title: '筛选设置',
                    show: true
                },
                component: () => import('@/views/t-task-manage/filter-set.vue'),
            }
        ]
    }
]