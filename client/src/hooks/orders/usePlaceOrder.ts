import { axiosInstance } from "@/lib/api-instance"
import { placeOrderSchema } from "@/lib/zod/orderSchema"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import z from "zod"

interface IPlaceOrderResponse {
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

const handlePlaceOrder = async (data: z.infer<typeof placeOrderSchema>) => {
  const response = await axiosInstance.post("/order/place-order", data)
  return response.data as IPlaceOrderResponse
}

export const usePlaceOrder = () => {
  return useMutation<
    IPlaceOrderResponse,
    AxiosError<IPlaceOrderResponse>,
    z.infer<typeof placeOrderSchema>
  >({
    mutationKey: ["placeOrder"],
    mutationFn: handlePlaceOrder,
  })
}
