<template>
    <div id="app">
      <!--用来显示当前默认路由组件页面：msite.vue-->
      <router-view/>
      <!--3、写如何将路由组件页面变成html标签，并引入页面：入标签-->
      <FooterGuide v-show="$route.meta.showFooter"/>
    </div>
</template>

<script>
// 1、vuex方法调用第二种
import {mapActions} from 'vuex'
// 如何将路由组件页面变成html标签，并引入页面：1、引入路由组件页面
import FooterGuide from './components/FooterGuide/FooterGuide'
// import {reqFoodCategorys} from './api'
export default {
  // async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成
  // async mounted(){
  //  const result = await reqFoodCategorys
  //   console.log(result)
  // },
  mounted () {
    // vuex方法调用第一种最简单。来调取store里的actions.js的getAddress方法，从而要更新数据。
    // this.$store.dispatch('getAddress')
    // 3、vuex方法调用第二种，上下方法一样效果
    // this.getAddress()
    // 异步获取用户信息
    // this.getUserInfo()
  },
  // 2、vuex方法调用第二种
  methods: {
    ...mapActions(['getAddress', 'getUserInfo'])
  },
  // 如何将路由组件页面变成html标签，并引入页面：2、映射成标签
  components: {
    FooterGuide
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
