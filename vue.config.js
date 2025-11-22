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

    // 为 source-map 中的 source 路径加上 package 名称前缀，例如： webpack:///my-vue2/src/... 
    config.output.devtoolModuleFilenameTemplate = `webpack://${appName}/[resource-path]`
    config.output.devtoolFallbackModuleFilenameTemplate = `webpack://${appName}/[resource-path]?[hash]`
  }
})
