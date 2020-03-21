<template>
  <!--底部导航组件-->
  <div class="footer_guide">
    <!--:class="{on: `/msite`===$route.path}:动态绑定样式，当前$route.path取得路由地址 === /msite，给当前元素添加on属性值-->
    <span href="javascript:;" class="guide_item" @click="goto(`/msite`)" :class="{on: `/msite`===$route.path}">
      <span class="item_icon">
        <i class="iconfont iconu"></i>
      </span>
      <span>外卖</span>
    </span>
    <span href="javascript:;" class="guide_item" @click="goto(`/search`)" :class="{on: `/search`===$route.path}">
      <span class="item_icon">
        <i class="iconfont iconsousuo"></i>
      </span>
      <span>搜索</span>
    </span>
    <span href="javascript:;" class="guide_item" @click="goto(`/order`)" :class="{on: `/order`===$route.path}">
      <span class="item_icon">
        <i class="iconfont icondingdan2"></i>
      </span>
      <span>订单</span>
    </span>
    <span href="javascript:;" class="guide_item" @click="goto(`/profile`)" :class="{on: `/profile`===$route.path}">
      <span class="item_icon">
        <i class="iconfont iconren"></i>
      </span>
      <span>我的</span>
    </span>
  </div>
</template>

<script>
export default {
  methods: {
    goto (path) {
      this.$router.replace(path)// 跳转到指定的url，但是这个方法不会向history里面添加新的记录
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*因为使用了top-border-1px(#e4e4e4)，所以必需引入mixins.styl*/
  @import "../../common/stylus/mixins.styl"
  .footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>
