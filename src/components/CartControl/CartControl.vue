<template>
  <!--购买商品数量计算组件-->
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont iconjian" v-if="food.count" @click.stop="updateFoodCount(false)"></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <div class="iconfont iconjia" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
export default {
  props: { // 父组件通过 属性props向下传递数据给子组件
    food: Object
  },
  methods: {
    updateFoodCount (isAdd) {
      this.$store.dispatch('updateFoodCount', {isAdd, food: this.food})
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
  .cart-decrease
    display: inline-block
    padding: 6px
    line-height: 24px
    font-size: 24px
    color: rgb(0, 160, 220)
  .iconjian
    display: inline-block
    /*padding 6px*/
    /*line-height 24px*/
    font-size 20px
    color $green
    border: 1px solid $green
    border-radius: 50%
    width: 20px
    height: 20px
    line-height: 20px
    margin-bottom: 6px;
    &.move-enter-active, &.move-leave-active
      transform all .3
    &.move-enter, &.move-leave-to
      opacity 0
      transform translateX(15px) rotate(180deg)
  .cart-count
    display: inline-block
    vertical-align: top
    min-width: 26px
    padding-top: 6px
    /*line-height: 24px*/
    text-align: center
    font-size: 10px
    color: rgb(147, 153, 159)
  .iconjia
    display: inline-block
    /*padding: 6px*/
    /*line-height: 24px*/
    font-size: 20px
    color $green
    border: 1px solid $green
    border-radius: 50%
    width: 20px
    height: 20px
    line-height: 20px
    margin-bottom: 6px;
</style>
