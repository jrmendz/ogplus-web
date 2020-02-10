const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css', 'html', 'svg']

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  publicPath: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  transpileDependencies: [
    'framework7',
    'framework7-vue',
    'template7',
    'dom7',
    'ssr-window'
  ],

  css: {
    loaderOptions: {
      sass: {
        data: `@import '@/assets/sass/main.scss';`
      }
    },
    sourceMap: true
  },
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  }
}
