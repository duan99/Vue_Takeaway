/* 入口JS。eslint已经禁用，所以这样的注释不会报错 */
import Vue from 'vue'
import App from './App.vue'
// 3、引入时间戳转日期：自定义过滤器
import './fiters'
// 1、引入图片懒加载：下载：npm install --save vue-lazyload
import VueLazyload from 'vue-lazyload'
// 2、声明使用图片懒加载：下载：npm install --save vue-lazyload
import loading from './common/imgs/loading.gif'
// 使用定义好的mock生成随机数据，拦截 Ajax 请求；加载mockServer即可
import './mock/mockServer'
// 引入路由器
import router from './router'
// 引入store:vuex
import store from './store'
// 引入mint-ui中的Button标签
import {Button} from 'mint-ui'
// mint-ui:注册全局里的button按钮标签
Vue.component(Button.name, Button)// <mt-botton>
Vue.use(VueLazyload, {// 内部自定义一个指令lazy
  loading: loading
})
// new Vue({
//   el: '#app',
//   // 2、映射my.vue组件标签
//   components: {App},
//   // 3、template:使用组件标签
//   template: '<App/>',
//   store
// })
// 上下意思一样，下面为简写
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 2、映射my.vue组件标签
  // 3、template:使用组件标签
  // render：渲染函数
  render: h => h(App),
  // 配置路由器
  router, // 使用上vue-router
  store// 使用上vuex
  // render: function (createElement) {ES5写法，更容易了解
  //   return createElement(App)//创建App元素标签
  // }
})
