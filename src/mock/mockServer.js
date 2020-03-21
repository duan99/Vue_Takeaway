// 使用mockjs提供mock数据接口：模拟后台提供后台接口，返回数据
// 1、引入mockjs
import Mock from 'mockjs'
// 2、引入data.json数据
import data from './data'

// 3、向外提供接口
// 返回goods接口
Mock.mock('/goods', {code: 0, data: data.goods})
// 返回ratings接口
Mock.mock('/ratings', {code: 0, data: data.ratings})
// 返回info接口
Mock.mock('/info', {code: 0, data: data.info})
// export default XXX不需要向外暴露方法
