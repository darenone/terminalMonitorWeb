const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/'
const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave: false, // 关闭eslint检查
    chainWebpack: config => {
        config.resolve.alias
        .set('@', resolve('src')) // 用@代替src，在项目里你需要引入文件的时候，只需要@/api,@/config,@/mock...即可
        .set('_c', resolve('src/components')) // 用_c代替src/components,我们需要引入组件时，只需要_c/HelloWorld.vue即可
    },
    productionSourceMap: false, // 打包时不生成map文件，这样减少打包的体积，加快打包速度
    // 跨域配置
    devServer: {
        open: true, // 浏览器自动打开
        hot: true, // 热更新，保存自动更新
        host: '0.0.0.0', // 局域网内可以访问
        port: 8082,
    }

}