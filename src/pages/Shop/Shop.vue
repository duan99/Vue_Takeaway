<template>
  <!--商家店铺详情组件-->
    <div>
      <ShopHeader></ShopHeader>
      <div class="tab">
        <div class="tab-item">
          <!--replace:解决在同一页面来回跳转到上一层，而是直接跳转到上一页-->
          <router-link to="/shop/goods" replace>点餐</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/shop/ratings" replace>评价</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/shop/info" replace>商家{{this.shopId}}</router-link>
        </div>
      </div>
      <!--keep-alive标签：路由缓存标签，数据不重新请求，返回上一页时，返回到浏览过的位置-->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import ShopHeader from '../../components/ShopHeader/ShopHeader'
export default {
  data () {
    return { // 2、点击一个店铺跳转路由
      shopId: this.$route.query.shopId, // 接收商品id
      supportClasses: ['activity-green', 'activity-red', 'activity-orange'] // 动态改变颜色的选值
    }
  },
  computed: {
    ...mapState(['info'])
  },
  components: {// 将ShopHeader映射成标签
    ShopHeader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
  /*.activity-green*/
    /*color green*/
  /*.activity-red*/
    /*color red*/
  /*.activity-orange*/
    /*color orange*/
</style>
