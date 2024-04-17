import { defineStore } from 'pinia'
interface Order {
  id: number
  main_type: number
  price: string
  num: number
  buyer_name: string
  product_type: string
  order_code: string
  picture_id: number
  real_product_url: string
  status: string
  product_name: string
  asin: string
  sku: string
  buyer_selection: string
  is_business: number
  publish_time: Date
  role: number
  publisher: string
  mark_str: string
  template_file: string
  show: number
  click_count: number
  seo_title: string
  seo_keyword: string
  seo_description: string
  static_page_model: number
}
export const useOrderStore = defineStore(
  'order',
  () => {
    const orderMap = new Map<number, Order>()
    const order: Order = {
      id: 0,
      main_type: 0,
      price: '',
      num: 0,
      buyer_name: '',
      product_type: '',
      order_code: '',
      picture_id: 0,
      real_product_url: '',
      status: '',
      product_name: '',
      asin: '',
      sku: '',
      buyer_selection: '',
      is_business: 0,
      publish_time: new Date(),
      role: 0,
      publisher: '',
      mark_str: '',
      template_file: '',
      show: 0,
      click_count: 0,
      seo_title: '',
      seo_keyword: '',
      seo_description: '',
      static_page_model: 0
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
