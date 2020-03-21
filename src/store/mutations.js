import Vue from 'vue'
// 直接更新state的多个方法的对象
// 7、从mutaions-types.js调用定义好的方法
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  REST_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'

// 8、使用调用的方法，以下为固定写法
export default { // export default命令，为模块指定默认输出
  [RECEIVE_ADDRESS] (state, {address}) { // mutations与actions交互时传递的是包含的数据对象
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, {categorys}) { // mutations与actions交互时传递的是包含的数据对象
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, {shops}) { // mutations与actions交互时传递的是包含的数据对象
    state.shops = shops
  },
  [RECEIVE_USER_INFO] (state, {userInfo}) { // mutations与actions交互时传递的是包含的数据对象
    state.userInfo = userInfo
  },
  [REST_USER_INFO] (state) { // mutations与actions交互时传递的是包含的数据对象
    state.userInfo = {}
  },
  [RECEIVE_INFO] (state, {info}) {
    state.info = info
  },
  [RECEIVE_RATINGS] (state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_GOODS] (state, {goods}) {
    state.goods = goods
  },
  [INCREMENT_FOOD_COUNT] (state, {food}) {
    if (!food.count) { // 第一次增加时, 没有 count
      // food.count = 1 // 添加 count 属性, 并指定为 1
      // 问题: 新添加的属性没有数据劫持==>数据绑定==>更新了数据但界面不变
      Vue.set(food, 'count', 1) // 给有数据绑定的对象添加指定属性名和值的属性(有绑定)
      // state.shopCart.push(food) // 添加到购物车
      // 将food添加到cartFoods中
      state.cartFoods.push(food)
    } else { // 有 count
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT] (state, {food}) {
    if (food.count) { // count 有值才减 1
      food.count--
      if (food.count === 0) {
        // 将food从cartFoods移除
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  // 清空购物车
  [CLEAR_CART] (state) { // mutations与actions交互时传递的是包含的数据对象
    // 清除food中的count
    state.cartFoods.forEach((food) => { food.count = 0 })
    // 移除购物车中所有购物项
    state.cartFoods = []
  },
  // 搜索商品列表
  [RECEIVE_SEARCH_SHOPS] (state, {searchShops}) { // mutations与actions交互时传递的是包含的数据对象
    this.searchShops = searchShops
  }
}
