import { defineStore } from 'pinia'
import { ref } from 'vue'
interface User {
  uid: number
  name: string
  role: string
}
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const setToken = (newValue: string) => {
      // 设置token
      token.value = newValue
    }

    const removeToken = () => {
      // 移除token
      token.value = ''
    }

    const user = ref<User>({
      uid: 0,
      name: '',
      role: ''
    })
    const setUser = (newValue: User) => {
      user.value = newValue
    }
    const removeUser = () => {
      user.value = {
        uid: 0,
        name: '',
        role: ''
      }
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
