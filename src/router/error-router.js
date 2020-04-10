export default [
    {
        path: '/compatible',
        name: 'compatible',
        meta: { title: '兼容', show: false},
        component: resolve => require(['@/errorpage/browser_check.vue'], resolve),
    },
    {
        path: '/notLogin',
        name: 'notLogin',
        meta: { title: '未登录或超时', show: false},
        component: resolve => require(['@/errorpage/extra_401_option.vue'], resolve),
    },
    {
        path: '/notFound',
        name: '404',
        meta: { title: '页面不存在', show: false},
        component: resolve => require(['@/errorpage/extra_404_option.vue'], resolve),
    },
    {
        path: '/abnormal',
        name: 'abnormal',
        meta: { title: '服务器异常', show: false},
        component: resolve => require(['@/errorpage/extra_500_option.vue'], resolve),
    },
]