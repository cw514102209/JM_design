// eslint-disable-next-line import/no-unresolved
import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const instance = axios.create({
  baseURL: isDev ? 'http://localhost:3000/api/v0' : '线上的测试地址',
  timeout: 10000,
  withCredentials: true,
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const n = localStorage.getItem('nickname')
    config.headers = {
      'x-requested-with': encodeURIComponent(n || ''),
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    if (response.headers['x-show-msg'] === 'zxzk_msg_200') {
      // 提示信息
    }
    return response.data.result
  },
  function (error) {
    // 对响应错误做点什么
    const { response } = error
    if (response.status === 404) {
      // 提示信息 如：请求资源未发现
    } else if (response.status === 403) {
      // 提示信息 如：response.data.msg
      // window.location.href = '/manage/user/login'
      // localStorage.clear()
    } else {
      // 提示信息 如：response.data.msg
    }
    return Promise.reject(error)
  }
)

export default instance
