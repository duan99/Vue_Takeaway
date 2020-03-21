// ajax请求函数模块
// 下载axios组件命令：npm install --save axios
import axios from 'axios'
export default function ajax (url, data = {}, type = 'GET') { // 默认向外暴露一个函数
  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise
    if (type === 'GET') {
      // 准备 url query 参数数据
      let dataStr = '' // 数据拼接字符串
      Object.keys(data).forEach(key => { // 将data数据拼接到url里面去
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送 get 请求
      promise = axios.get(url)
    } else {
      // 发送 post 请求
      promise = axios.post(url, data)
    }
    promise.then(function (response) { // 成功的回调函数
      // 接口调用成功后调用resolve()，response.data：获得接口返回数据
      resolve(response.data)
    }).catch(function (error) { // 失败的回调函数
      // 接口调用失败执行reject()，reject(error)：获取错误信息
      reject(error)
    })
  })
}
