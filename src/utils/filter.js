import Vue from 'vue'
import moment from 'moment'

Vue.filter('time', (input, str = 'YYYY-MM-DD') => {
  return moment(input).format(str)
})
