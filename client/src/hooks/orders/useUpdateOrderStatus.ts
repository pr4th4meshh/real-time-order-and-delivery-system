import { axiosInstance } from "@/lib/api-instance"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

interface IUpdateOrderStatusResponse {
    success: boolean
    message: string
    data: [
      {
        id: string
        customerId: string
        status: "placed" | "accepted" | "picked" | "delivered"
        partnerId: string | null
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

  const handleUpdateOrderStatus = async ([id, status]: [string, string]) => {
    const response = await axiosInstance.patch(`/order/${id}`, {
      status,
    })
    return response.data as IUpdateOrderStatusResponse
  }
  

export const useUpdateOrderStatus = () => {
    return useMutation<
      IUpdateOrderStatusResponse,
      AxiosError<IUpdateOrderStatusResponse>,
      [string, string]
    >({
      mutationKey: ["updateOrderStatus"],
      mutationFn: handleUpdateOrderStatus,
    })  
}