import { axiosInstance } from "@/lib/api-instance"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

interface IAcceptOrderResponse {
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

const handleAcceptOrder = async (id: string) => {
  const response = await axiosInstance.patch(`/order/${id}/accept`)
  return response.data as IAcceptOrderResponse
}

export const useAcceptOrder = () => {
  return useMutation<
    IAcceptOrderResponse,
    AxiosError<IAcceptOrderResponse>,
    string
  >({
    mutationKey: ["acceptOrder"],
    mutationFn: handleAcceptOrder,
  })
}
