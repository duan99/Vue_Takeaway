// 包含基于多个state的getter计算属性状态的对象
export default { // export default命令，为模块指定默认输出
  // 总数量
  totalCount (state) {
    // reduce():计算数组元素相加后的总和：
    return state.cartFoods.reduce((preTotal, food) => {
      return preTotal + food.count
    }, 0)
  },
  totalPrice (state) { // 总价格
    return state.cartFoods.reduce((preTotal, food) => {
      return preTotal + food.count * food.price
    }, 0)
  },
  // 商品评价组件里计算满意评价个数的属性事件
  positiveSize (state) {
    // reduce():计算数组元素相加后的总和：
    return state.ratings.reduce((preTotal, rating) => preTotal + (rating.rateType === 0 ? 1 : 0), 0)
  }
}
