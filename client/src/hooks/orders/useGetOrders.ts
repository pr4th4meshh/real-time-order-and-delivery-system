import { axiosInstance } from "@/lib/api-instance"
import { useQuery } from "@tanstack/react-query"

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
        }
      ]
    }
  ]
}

const handleGetOrders = async () => {
  const response = await axiosInstance.get("/order")
  return response.data as IOrderResponse
}

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: handleGetOrders,
  })
}
