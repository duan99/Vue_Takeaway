import Vue from 'vue'// 通过vue定义
import moment from 'moment'// 2、引入moment

// 1、时间戳转日期：自定义过滤器,需要下载一个moment库：下载指令：npm install --save moment
Vue.filter('data-format', function (value, formatStr = 'YYYY-MM-DD HH:mm:ss') {
  return moment(value).format(formatStr)
})
