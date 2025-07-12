import axios from 'axios'
import { Toast } from 'vant'
// 创建axios实例
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api/',
  timeout: 8000,
  headers: { platform: 'H5' }
})
// 配置请求拦截器

instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 开启loading，防止重复请求
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (response.data.status !== 200) {
    Toast(response.data.message)
    return Promise.reject(response.data.message)
  }
  Toast.clear()
  // console.log(response.data)
  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  if (error.response?.status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  if (error.response?.status === 500) {
    alert('服务器内部错误')
    return Promise.reject(error)
  }
  return Promise.reject(error)
})

// 导出axios实例
export default instance
