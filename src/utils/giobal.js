import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import HmHeader from '../components/HmHeader.vue'
import HmLogo from '../components/HmLogo.vue'
import HmNavitem from '../components/HmNavitem.vue'

import Toast from 'vant'

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// 请求拦截器和响应拦截器
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.authorization = token // 请求头加上token
  }
  return config
})
axios.interceptors.response.use(function (res) {
  const { statusCode, message } = res.data
  // 拦截响应 判断响应中状态码 若是失效 退回login 删除本地失效token
  if (statusCode === 401 && message === '用户信息验证失败') {
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    Toast.fail('验证失效')
  }
  return (res)
})

Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-navitem', HmNavitem)
