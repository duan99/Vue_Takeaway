// vuex最核心的管理对象store
// 1、vuex使用第一步引入vue，引入store文件下的其余四个js文件，这里全是固定写法
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// 2、声明使用Vuex
Vue.use(Vuex)
// 3、创建vuex
export default new Vuex.Store({
  // 4、传配置对象
  state,
  mutations,
  actions,
  getters
})
