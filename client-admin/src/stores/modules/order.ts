import { defineStore } from 'pinia'
interface Order {
  id: number
  name: string
  status: boolean
  account: string
  phone: string
  email: string
  role: string
  date: string
}
export const useOrderStore = defineStore(
  'order',
  () => {
    const orderMap = new Map<number, Order>()
    const order: Order = {
      id: 0,
      name: '',
      status: false,
      account: '',
      phone: '',
      email: '',
      role: '',
      date: ''
    }
    orderMap.set(0, order)

    // 保存订单输入
    const setOrder = (uid: number, order: Order) => {
      console.log(uid, order, '订单输入')
      orderMap.set(uid, order)
    }

    // 删除订单
    const deleteOrder = (uid: number) => {
      orderMap.delete(uid)
    }
    //获取订单
    const getOrder = (uid: number) => {
      console.log(uid, orderMap.get(uid), '获取订单')
      return orderMap.get(uid)
    }

    return { orderMap, setOrder, deleteOrder, getOrder }
  },
  {
    //持久化
    persist: true
  }
)
