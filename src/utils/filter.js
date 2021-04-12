import Vue from 'vue'
import moment from 'moment'
moment.locale('zh-CN')

Vue.filter('time', (input, str = 'YYYY-MM-DD') => {
  return moment(input).format(str)
})
Vue.filter('now', input => {
  return moment(input).fromNow()
})
