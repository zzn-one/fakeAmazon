import { defineStore } from 'pinia'
import { ref } from 'vue'
interface User {
  id: number
  name: string
  username: string
  role: string
  create_time: string
}
export const useUserStore = defineStore(
  'user',
  () => {
    //token
    const token = ref('')
    const setToken = (newValue: string) => {
      // 设置token
      token.value = newValue
    }

    const removeToken = () => {
      // 移除token
      token.value = ''
    }
    // 用户信息
    const user = ref<User>({
      id: 0,
      name: '',
      username: '',
      role: '',
      create_time: ''
    })
    const setUser = (newValue: User) => {
      user.value = newValue
    }
    const removeUser = () => {
      user.value.id = 0
      user.value.name = ''
      user.value.username = ''
      user.value.role = ''
      user.value.create_time = ''
    }
    return {
      token,
      setToken,
      removeToken,
      user,
      setUser,
      removeUser
    }
  },
  {
    //持久化
    persist: true
  }
)
