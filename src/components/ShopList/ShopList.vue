<template>
    <!--首页商家列表组件-->
  <div class="msite_shop_list">
    <div class="shop_header">
      <i class="iconfont icon-xuanxiang"></i>
      <span class="shop_header_title">附近商家</span>
    </div>
    <div class="shop_container">
      <ul class="shop_list" v-if="info.supports">
      <!--<ul class="shop_list" v-if="shop.length">-->
        <!--<li class="shop_li border-1px" v-for="(shop, index) in shops" :key="index" @click="$router.push('/shop')">-->
        <li class="shop_li border-1px" v-for="(infos, index) in info.supports" :key="index" @click="goToPage(infos.type)">
        <!--<li class="shop_li border-1px" @click="goToPage(shopId)">-->
          <a>
            <div class="shop_left">
              <!--baseImgUrl-->
              <!--<img class="shop_img" :src="baseImgUrl+shop.image_path">-->
              <img class="shop_img" src="./images/shop/1.jpg">
            </div>
            <div class="shop_right">
              <section class="shop_detail_header">
                <!--<h4 class="shop_title ellipsis">{{shop.name}}</h4>-->
                <h4 class="shop_title ellipsis">锄禾日当午，汗滴禾下土</h4>
                <ul class="shop_detail_ul">
                  <!--<li class="supports" v-for="(support, index) in shops.supports" :key="index">-->
                    <!--{{support.icon_name}}-->
                  <!--</li>-->
                  <li class="supports">保</li>
                  <li class="supports">准</li>
                  <li class="supports">票</li>
                </ul>
              </section>
              <section class="shop_rating_order">
                <section class="shop_rating_order_left">
                  <!--<Star :score="shop.rating" :size="24"></Star>-->
                  <Star></Star>
                  <!--<div class="star star-24">-->
                    <!--<span class="star-item on"></span>-->
                    <!--<span class="star-item on"></span>-->
                    <!--<span class="star-item on"></span>-->
                    <!--<span class="star-item half"></span>-->
                    <!--<span class="star-item off"></span>-->
                  <!--</div>-->
                  <div class="rating_section">
                    3.6
                  </div>
                  <!--<div class="rating_section">-->
                    <!--{{shop.rating}}-->
                  <!--</div>-->
                  <!--<div class="order_section">-->
                    <!--月售{{shop.recent_roder_num}}单-->
                  <!--</div>-->
                  <div class="order_section">
                    月售106单
                  </div>
                </section>
                <section class="shop_rating_order_right">
                  <span class="delivery_style delivery_right">硅谷专送</span>
                  <!--<span class="delivery_style delivery_right">{{shop.delivery_mode.text}}</span>-->
                </section>
              </section>
              <section class="shop_distance">
                <p class="shop_delivery_msg">
                  <span>¥20起送</span>
                  <!--<span>¥{{shop.float_minimum_order_amount}}起送</span>-->
                  <span class="segmentation">/</span>
                  <span>配送费约¥5</span>
                  <!--<span>配送费约¥{{shop.float_delivery_fee}}</span>-->
                </p>
              </section>
            </div>
          </a>
        </li>
        <!--<li class="shop_li border-1px">-->
          <!--<a>-->
            <!--<div class="shop_left">-->
              <!--<img class="shop_img" src="./images/shop/2.jpg">-->
            <!--</div>-->
            <!--<div class="shop_right">-->
              <!--<section class="shop_detail_header">-->
                <!--<h4 class="shop_title ellipsis">锄禾日当午，汗滴禾下土</h4>-->
                <!--<ul class="shop_detail_ul">-->
                  <!--<li class="supports">保</li>-->
                  <!--<li class="supports">准</li>-->
                  <!--<li class="supports">票</li>-->
                <!--</ul>-->
              <!--</section>-->
              <!--<section class="shop_rating_order">-->
                <!--<section class="shop_rating_order_left">-->
                  <!--<div class="star star-24">-->
                    <!--<span class="star-item on"></span>-->
                    <!--<span class="star-item on"></span>-->
                    <!--<span class="star-item on"></span>-->
                    <!--<span class="star-item on"></span>-->
                    <!--<span class="star-item off"></span>-->
                  <!--</div>-->
                  <!--<div class="rating_section">-->
                    <!--4.1-->
                  <!--</div>-->
                  <!--<div class="order_section">-->
                    <!--月售106单-->
                  <!--</div>-->
                <!--</section>-->
                <!--<section class="shop_rating_order_right">-->
                  <!--<span class="delivery_style delivery_right">硅谷专送</span>-->
                <!--</section>-->
              <!--</section>-->
              <!--<section class="shop_distance">-->
                <!--<p class="shop_delivery_msg">-->
                  <!--<span>¥20起送</span>-->
                  <!--<span class="segmentation">/</span>-->
                  <!--<span>配送费约¥5</span>-->
                <!--</p>-->
              <!--</section>-->
            <!--</div>-->
          <!--</a>-->
        <!--</li>-->
        <!--<li class="shop_li border-1px">-->
          <!--<a>-->
            <!--<div class="shop_left">-->
              <!--<img class="shop_img" src="./images/shop/3.jpg">-->
            <!--</div>-->
            <!--<div class="shop_right">-->
              <!--<section class="shop_detail_header">-->
                <!--<h4 class="shop_title ellipsis">锄禾日当午，汗滴禾下土</h4>-->
                <!--<ul class="shop_detail_ul">-->
                  <!--<li class="supports">保</li>-->
                  <!--<li class="supports">准</li>-->
                  <!--<li class="supports">票</li>-->
                <!--</ul>-->
              <!--</section>-->
              <!--<section class="shop_rating_order">-->
                <!--<section class="shop_rating_order_left">-->
                  <!--<div class="star star-24">-->
                    <!--<span class="star-item on"></span>-->
                    <!--<span class="star-item on"></span>-->
                    <!--<span class="star-item on"></span>-->
                    <!--<span class="star-item off"></span>-->
                    <!--<span class="star-item off"></span>-->
                  <!--</div>-->
                  <!--<div class="rating_section">-->
                    <!--3.2-->
                  <!--</div>-->
                  <!--<div class="order_section">-->
                    <!--月售106单-->
                  <!--</div>-->
                <!--</section>-->
                <!--<section class="shop_rating_order_right">-->
                  <!--<span class="delivery_style delivery_right">硅谷专送</span>-->
                <!--</section>-->
              <!--</section>-->
              <!--<section class="shop_distance">-->
                <!--<p class="shop_delivery_msg">-->
                  <!--<span>¥20起送</span>-->
                  <!--<span class="segmentation">/</span>-->
                  <!--<span>配送费约¥5</span>-->
                <!--</p>-->
              <!--</section>-->
            <!--</div>-->
          <!--</a>-->
        <!--</li>-->
        <!--<li class="shop_li border-1px">-->
          <!--<a>-->
            <!--<div class="shop_left">-->
              <!--<img class="shop_img" src="./images/shop/4.jpg">-->
            <!--</div>-->
            <!--<div class="shop_right">-->
              <!--<section class="shop_detail_header">-->
                <!--<h4 class="shop_title ellipsis">锄禾日当午，汗滴禾下土</h4>-->
                <!--<ul class="shop_detail_ul">-->
                  <!--<li class="supports">保</li>-->
                  <!--<li class="supports">准</li>-->
                  <!--<li class="supports">票</li>-->
                <!--</ul>-->
              <!--</section>-->
              <!--<section class="shop_rating_order">-->
                <!--<section class="shop_rating_order_left">-->
                  <!--<div class="star star-24">-->
                    <!--<span class="star-item on"></span>-->
                    <!--<span class="star-item on"></span>-->
                    <!--<span class="star-item on"></span>-->
                    <!--<span class="star-item half"></span>-->
                    <!--<span class="star-item off"></span>-->
                  <!--</div>-->
                  <!--<div class="rating_section">-->
                    <!--3.6-->
                  <!--</div>-->
                  <!--<div class="order_section">-->
                    <!--月售106单-->
                  <!--</div>-->
                <!--</section>-->
                <!--<section class="shop_rating_order_right">-->
                  <!--<span class="delivery_style delivery_right">硅谷专送</span>-->
                <!--</section>-->
              <!--</section>-->
              <!--<section class="shop_distance">-->
                <!--<p class="shop_delivery_msg">-->
                  <!--<span>¥20起送</span>-->
                  <!--<span class="segmentation">/</span>-->
                  <!--<span>配送费约¥5</span>-->
                <!--</p>-->
              <!--</section>-->
            <!--</div>-->
          <!--</a>-->
        <!--</li>-->
      </ul>
      <ul class="shop_list" v-else>
        <li class="shop_li border-1px">
          <img src="./images/shop_back.svg"/>
        </li>
        <li class="shop_li border-1px">
          <img src="./images/shop_back.svg"/>
        </li>
        <li class="shop_li border-1px">
          <img src="./images/shop_back.svg"/>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
// mapState的使用：1、引入vuex里的mapState隐射函数，读取数据引用
import {mapState} from 'vuex'
import Star from '../Star/Star'
export default {
  data () {
    return {
      baseImgUrl: 'http://cangdu.org:8001/img/',
      fa: false
    }
  },
  mounted () {
    // vuex方法调用第一种最简单。来调取store里的actions.js的getCategorysgetShopInfo方法，从而要更新数据。
    this.$store.dispatch('getShopInfo')
  },
  methods: { // 定义方法函数
    // 1、点击一个店铺跳转路由
    goToPage (shopId) {
      this.$router.push({
        path: '/shop',
        query: { // 传值商品id
          shopId: shopId
        }
      })
    }
  },
  components: {
    // 映射成HTML标签
    Star
  },
  computed: { // 写计算属性
    // mapState的使用：2、shops里的数据，并创建计算属性为shops
    ...mapState(['shops', 'info'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .shop_header
      padding 10px 10px 0
      .shop_icon
        margin-left 5px
        color #999
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
    .shop_container
      margin-bottom 50px
      .shop_list
        .shop_li
          bottom-border-1px(#f1f1f1)
          width 100%
          >a
            clearFix()
            display block
            box-sizing border-box
            padding 15px 8px
            width 100%
            .shop_left
              float left
              box-sizing border-box
              width 23%
              height 75px
              padding-right 10px
              .shop_img
                display block
                width 100%
                height 100%
            .shop_right
              float right
              width 77%
              .shop_detail_header
                clearFix()
                width 100%
                .shop_title
                  float left
                  width 200px
                  color #333
                  font-size 16px
                  line-height 16px
                  font-weight 700
                  &::before
                    content '品牌'
                    display inline-block
                    font-size 11px
                    line-height 11px
                    color #333
                    background-color #ffd930
                    padding 2px 2px
                    border-radius 2px
                    margin-right 5px
                .shop_detail_ul
                  float right
                  margin-top 3px
                  .supports
                    float left
                    font-size 10px
                    color #999
                    border 1px solid #f1f1f1
                    padding 0 2px
                    border-radius 2px
              .shop_rating_order
                clearFix()
                width 100%
                margin-top 18px
                margin-bottom 8px
                .shop_rating_order_left
                  float left
                  color #ff9a0d
                  .rating_section
                    float left
                    font-size 10px
                    color #ff6000
                    margin-left 4px
                  .order_section
                    float left
                    font-size 10px
                    color #666
                    transform scale(.8)
                .shop_rating_order_right
                  float right
                  font-size 0
                  .delivery_style
                    transform-origin 35px 0
                    transform scale(.7)
                    display inline-block
                    font-size 12px
                    padding 1px
                    border-radius 2px
                  .delivery_left
                    color #fff
                    margin-right -10px
                    background-color #02a774
                    border 1px solid #02a774
                  .delivery_right
                    color #02a774
                    border 1px solid #02a774
              .shop_distance
                clearFix()
                width 100%
                font-size 12px
                .shop_delivery_msg
                  float left
                  transform-origin 0
                  transform scale(.9)
                  color #666
                .segmentation
                  color #ccc
</style>
