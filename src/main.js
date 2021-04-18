import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.less'
import './styles/iconfont.css'
import 'amfe-flexible'

// 全局组件引入
import './utils/giobal'
// 全局引入过滤器
import './utils/filter'
// 引入vant
import './utils/vant'
// 引入请求部分
import './utils/request'

const bus = new Vue()
Vue.prototype.$bus = bus

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
