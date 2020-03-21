// 通过mutaions间接更新state的多个方法的对象
// 9、从mutaions-types.js调用定义好的方法
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
// 10、引入api中的ajax接口函数
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopInfo,
  reqShopRatings,
  reqShopGoods,
  reqSearchShop
} from '../api'
export default { // export default命令，为模块指定默认输出
  async getAddress ({commit, state}) { // 异步获取地址步骤解析1：async 用于申明一个 名称为getAddress的function异步函数，传入对象参数{commit, state}
    // 步骤解析2：声明常量geohash，从state.js中获取latitude、longitude并赋值
    const geohash = state.latitude + ',' + state.longitude
    // 步骤解析3：声明常量result == 异步执行完再执行代码await reqAddress(geohash)的ajax事件
    const result = await reqAddress(geohash)
    // 步骤解析4：将常量result，使用名称为RECEIVE_ADDRESS，以对象的形式存储起来
    commit(RECEIVE_ADDRESS, {address: result.data})
  },
  // 异步获取分类列表
  async getCategorys ({commit}) {
    const result = await reqFoodCategorys()
    commit(RECEIVE_CATEGORYS, {categorys: result.data})
  },
  // 异步获取商家列表
  async getShops ({commit, state}) {
    const {latitude, longitude} = state
    const result = await reqShops({latitude, longitude})
    commit(RECEIVE_SHOPS, {shops: result.data})
  },
  // 因为用户登录时已经获得user数据，所以同步记录用户信息
  recordUser ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },
  // 异步获取用户信息
  async getUserInfo ({commit}) {
    // 调用ajax事件
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },
  // 异步退出登录事件
  async logout ({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(REST_USER_INFO, {result})
    }
  },
  // 异步获取商家信息
  async getShopInfo ({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      info.score = 3.5
      commit(RECEIVE_INFO, {info})
    }
  },
  // 异步获取商家评价列表
  async getShopRatings ({commit}, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      // 数据更新后, 通知调用的组件
      callback && callback()
    }
  },
  // 异步获取商家商品列表
  async getShopGoods ({commit}, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 数据更新后, 通知调用的组件
      callback && callback()
    }
  },
  // 同步更新food中的数量：count的值
  updateFoodCount ({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },
  // 同步清空购物车
  clearCart ({commit}) {
    commit(CLEAR_CART)
  },
  // 异步搜索获取商家商品列表
  async searchShops ({commit, state}, keyword) {
    // 步骤解析2：声明常量geohash，从state.js中获取latitude、longitude并赋值
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, {searchShops})
    }
  }
}
