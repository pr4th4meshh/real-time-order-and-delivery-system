import { axiosInstance } from "@/lib/api-instance"
import { useQuery } from "@tanstack/react-query"

export type OrderType = "available" | "mine" | undefined

interface IOrderResponse {
  success: boolean
  message: string
  data: [
    {
      id: string
      customerId: string
      status: string
      partnerId: string
      createdAt: string
      updatedAt: string
      items: [
        {
          id: string
          orderId: string
          productId: string
          qty: number
          product: {
            id: string
            name: string
            description: string
            price: number
            imageUrl: string
          }
        }
      ]
    }
  ]
}

const handleGetOrders = async (type: OrderType = undefined) => {
  const query = type ? `?type=${type}` : ""
  const response = await axiosInstance.get(`/order${query}`)
  return response.data as IOrderResponse
}

export const useGetOrders = (type: OrderType = undefined) => {
  return useQuery({
    queryKey: ["orders", type],
    queryFn: () => handleGetOrders(type),
  })
}