import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'
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
    //携带token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
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
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (error) => {
    //处理特殊异常
    if (error.response.status === 401) {
      //token过期
      const userStore = useUserStore()
      userStore.removeToken()
      userStore.removeUser()
      //跳转到登录页面
      router.push('/login')
    }

    ElMessage.error(error.response.data.message || '服务异常')
    return Promise.reject(error)
  }
)

export default request
