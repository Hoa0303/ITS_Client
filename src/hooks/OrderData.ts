import { ref } from 'vue'

export interface OrderData {
  id: number
  paymentMethod: string
  orderStatus: number
  orderDate: string
  orderTime: string
  payBackUrl: string
  reviewed: boolean
  total: number
  amountPaid: number
  deadline: any
}

export interface OrderDetail {
  id: number
  productOrderDetails: any
  total: number
  orderDate: string
  deliveryAddress: string
  phoneNumber: string
  receiver: string
  amountPaid: number
}

export interface Review {
  productId: number
  description: string
  start: number
}

export enum OrderSatus {
  'Processing',
  'Confirmed',
  'Shipping',
  'Received',
  'Done',
  'Canceled',
}

export function useTableData() {
  const orders = ref<OrderData[]>([])
  function setOrder(data: OrderData[]) {
    orders.value = data
  }

  const oderDetailData = ref<OrderDetail>()
  function setOrderDetailData(data: OrderDetail) {
    oderDetailData.value = data
  }

  return {
    orders,
    oderDetailData,
    setOrder,
    setOrderDetailData,
  }
}
