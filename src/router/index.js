// 1、路由器对象模块的使用
import Vue from 'vue'
import Router from 'vue-router'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'
import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
// import MSite from '../pages/MSite/MSite'
// import Order from '../pages/Order/Order'
// import Profile from '../pages/Profile/Profile'
// import Search from '../pages/Search/Search'
const MSite = () => import('../pages/MSite/MSite')// 路由组件懒加载
const Order = () => import('../pages/Order/Order')// 路由组件懒加载
const Profile = () => import('../pages/Profile/Profile')// 路由组件懒加载
const Search = () => import('../pages/Search/Search')// 路由组件懒加载
// 2、声明使用路由插件
Vue.use(Router)
// 3、创建一个路由构造函数
export default new Router({
  // 4、配置路由
  routes: [
    {
      path: '/msite',
      name: 'MSite',
      component: MSite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop,
      children: [// 配置子路由
        {
          path: '/shop/goods',
          name: 'ShopGoods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          name: 'ShopRatings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          name: 'ShopInfo',
          component: ShopInfo
        },
        // 子路由默认显示
        {
          path: '/',
          redirect: '/shop/goods'
        }
      ]
    },
    // 默认显示
    {
      path: '/',
      redirect: '/msite'
    }
  ]
})
