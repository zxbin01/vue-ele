const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

function addStyleResource (rule) {
  rule.use('style-resource')
  .loader('style-resources-loader')
  .options({
      patterns: [
          path.resolve(__dirname, './src/assets/stylus/mixins.styl')
      ]
  })
}

module.exports = {
  publicPath: "./",
  outputDir: 'dist',
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)));
    config.resolve.alias
            .set('assets', resolve('src/assets'))
            .set('views', resolve('src/views'))
            .set('network', resolve('src/network'))
            .set('components', resolve('src/components'))
  }
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       'assets': '@/assets',
  //       'components': '@/components',
  //       'network': '@/network',
  //       'views': '@/views'
  //     }
  //   }
  // }
}