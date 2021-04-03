import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.less'
import './styles/iconfont.css'
import 'amfe-flexible'
import Vant from 'vant'
import 'vant/lib/index.css'
import axios from 'axios'
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3000'
Vue.use(Vant)
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
