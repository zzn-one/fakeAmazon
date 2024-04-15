import axios from 'axios'
const baseURL = ''

const request = axios.create({
  baseURL,
  timeout: 10000
  // headers: {
  //     'Content-Type': 'application/json',
  // },
})

// 请求拦截
request.interceptors.request.use(
  (config) => {
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截
request.interceptors.response.use(
  (res) => {
    if (res.data.code === 200) {
      return res
    }
    //处理业务失败
    
    return Promise.reject(res.data)
  },
  (error) => {
    //处理特殊异常
    

    return Promise.reject(error)
  }
)

export default request
