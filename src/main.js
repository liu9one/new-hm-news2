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
import HmNavitem from './components/HmNavitem.vue'
import moment from 'moment'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3000'

Vue.use(Vant)
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-navitem', HmNavitem)
Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
