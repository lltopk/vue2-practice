const { defineConfig } = require('@vue/cli-service')
const pkg = require('./package.json')
const appName = pkg.name || 'app'
module.exports = defineConfig({
  transpileDependencies: true,
  // 生产构建是否生成 .map 文件
  productionSourceMap: true,
  // 通过 configureWebpack 设置不同环境的 devtool + source-map 前缀

  configureWebpack: config => {
    // 保证 output 存在
    config.output = config.output || {}

    // 开发/生产统一使用 source-map（可按需切换为 eval-source-map）
    if (process.env.NODE_ENV === 'production') {
      config.devtool = 'source-map'
    } else {
      config.devtool = 'source-map'
    }

    //source-map 中的 source 路径是devtoolModuleFilenameTemplate
    //可以在代码中加入debugger, 然后去浏览器查看映射文件的全路径
    //格式为'webpack://[namespace][resource-path]?[loaders]')
    //默认格式带有?哈希后缀, 每次映射的文件都带有随机的哈希后缀, 随机意味着我们无法一劳永逸的配置断点
    //我们可以重写它，去掉哈希后缀, 同时用 package 名称作为namespace，方便在浏览器 devtools 中区分不同项目的 source 文件
    // 例如： webpack:///my-vue2/src/... 
    config.output.devtoolModuleFilenameTemplate = `webpack://${appName}/[resource-path]`
    config.output.devtoolFallbackModuleFilenameTemplate = `webpack://${appName}/[resource-path]?[hash]`
  }
})
