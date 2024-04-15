import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// 自动引入所有模块
export * from './modules/user'
export * from './modules/order'
