<template>
  <!--商品列表组件-->
  <div>
    <div class="goods">
      <!--左侧导航-->
      <div class="menu-wrapper">
        <ul>
          <!--current-->
          <li class="menu-item" v-for="(good, index) in goods" :key="index"
              :class="{current: currentIndex===index}" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" v-if="good.icon" :src="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <!--右侧导航-->
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul >
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <ShopCart ></ShopCart>
    </div>
    <!--1、props:父组件向子组件传递数据用-->
    <Food ref="food" :food="food"></Food>
  </div>
</template>
<script>
import {mapState} from 'vuex'
// 引入购买商品数量计算组件
import CartControl from '../../../components/CartControl/CartControl'
// 引入显示单个商品详情的组件
import Food from '../../../components/Food/Food'
// 引入购物车组件
import ShopCart from '../../../components/ShopCart/ShopCart'
// 1、引入商品滑动组件better-scroll：下载命令：npm install --save better-scroll
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      scrollY: 0, // 右侧 Y 轴滑动的坐标
      tops: [], // 包含右侧所有分类小列表的 top 值
      food: {}// 2、props:父组件向子组件传递数据用
    }
  },
  mounted () {
    this.$store.dispatch('getShopGoods', () => { // 数据更新后执行
      this.$nextTick(() => { // 列表数据更新显示之后执行
        this._initScroll()
        this._initTops()
      })
    })
  },
  methods: {
    _initScroll () {
      // 2、商品滑动组件better-scroll：找到class='menu-wrapper'的元素创建左侧导航滚动事件
      /* eslint-disable no-new */
      new BScroll('.menu-wrapper', {
        click: true
      })
      this.foodsScroll = new BScroll('.foods-wrapper', {
        probeType: 2, // 惯性滑动不会触发滚动监听
        click: true
      })
      // 3、给右侧商品导航绑定滚动监听（scroll）.
      this.foodsScroll.on('scroll', ({x, y}) => { // {x, y}为x、y轴
        console.log(x, y)
        this.scrollY = Math.abs(y) // 返回变量的绝对值y:Math.abs(-1):1
      })
      // 4、给右侧商品导航绑定滚动结束的监听（scroll）.
      this.foodsScroll.on('scrollEnd', ({x, y}) => { // {x,y}为x、y轴
        console.log('scrollEnd', x, y)
        this.scrollY = Math.abs(y)// 返回变量的绝对值y:Math.abs(-1):1
      })
    },
    // 收集右侧导航所有li元素的高度，保存在tops[],
    _initTops () {
      // 1、初始化tops
      const tops = []
      let top = 0
      // 计算各个 top, 并保存到 tops
      tops.push(top)
      // 2、收集tops
      // 找到右侧导航所有的li元素
      const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')// 不同写法this.$refs.foodsUl.children、this.$refs.foodsUl.getElementsByClassName('food-list-hook')
      // Array.prototype.slice.call(arguments):能够将具有length属性的arguments转换为数组
      Array.prototype.slice.call(lis).forEach((li, index) => {
        top += li.clientHeight // clientHeight: 网页可见区域高
        tops.push(top)
      })
      // 3、更新tops
      this.tops = tops
      console.log(this.tops)
    },
    clickMenuItem (index) { // 点击左侧导航，右侧滑动到对应的商品位置事件
      console.log(index)
      // 右侧滑动到相对应的位置
      const y = this.tops[index]
      // 让左侧分类项成为当前分类项
      this.scrollY = y
      // 平滑滚动右侧列表到对应的位置坐标
      this.foodsScroll.scrollTo(0, -y, 300)
    },
    // 点击商品显示商品大图以及详情
    showFood (food) {
      this.food = food
      // 在父组件调用子组件的方法
      this.$refs.food.toggleShow()
    }
  },
  computed: {
    ...mapState(['goods']),
    // 计算得到当前分类的下标
    currentIndex () {
      // 得到条件数据
      const {scrollY, tops} = this
      // 根据条件数据进行计算结果
      const index = tops.findIndex((top, index) => {
        // scrollY>=当前top && scrollY<下一个top
        return scrollY >= top && scrollY < this.tops[index + 1]
      })
      // 返回结果
      return index
    }
  },
  components: {
    CartControl,
    Food,
    ShopCart
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7
  .menu-item
    display: table
    height: 54px
    width: 56px
    padding: 0 12px
    line-height: 14px
    &.current
      position: relative
      z-index: 10
      margin-top: -1px
      background: #fff
      color: $green
      font-weight: 700
  .text
    border-none()
  .icon
    display: inline-block
    vertical-align: top
    width: 12px
    height: 12px
    margin-right: 2px
    background-size: 12px 12px
    background-repeat: no-repeat
  .text
    display: table-cell
    width: 56px
    vertical-align: middle
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    font-size: 12px
  .foods-wrapper
    flex: 1
  .title
    padding-left: 14px
    height: 26px
    line-height: 26px
    border-left: 2px solid #d9dde1
    font-size: 12px
    color: rgb(147, 153, 159)
    background: #f3f5f7
  .food-item
    display: flex
    margin: 18px
    padding-bottom: 18px
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    &:last-child
      border-none()
      margin-bottom: 0
  .icon
    flex: 0 0 57px
    margin-right: 10px
  .content
    flex: 1
  .name
    margin: 2px 0 8px 0
    height: 14px
    line-height: 14px
    font-size: 14px
    color: rgb(7, 17, 27)
  .desc, .extra
    line-height: 10px
    font-size: 10px
    color: rgb(147, 153, 159)
  .desc
    line-height: 12px
    margin-bottom: 8px
  .extra
  .count
    margin-right: 12px
  .price
    font-weight: 700
    line-height: 24px
  .now
    margin-right: 8px
    font-size: 14px
    color: rgb(240, 20, 20)
  .old
    text-decoration: line-through
    font-size: 10px
    color: rgb(147, 153, 159)
  .cartcontrol-wrapper
    position: absolute
    right: 0
    bottom: 12px
</style>
