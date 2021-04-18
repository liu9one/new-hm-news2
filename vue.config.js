module.exports = {
  devServer: {
    open: true
  },
  // 覆盖webpack的配置参数
  configureWebpack: {
    // 排除依赖项
    externals: {
      // 参数1：排除的模块名
      // 参数2： 全局变量名
      vue: 'Vue',
      'vue-router': 'VueRouter',
      moment: 'moment',
      axios: 'axios',
      vant: 'vant'
    }
  }
}
