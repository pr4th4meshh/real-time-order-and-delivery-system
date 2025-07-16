import { axiosInstance } from "@/lib/api-instance"
import { productSchema } from "@/lib/zod/productSchema"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import z from "zod"

export interface ICreateProductResponse {
  success: boolean
  message: string
  data: {
    id: string
    name: string
    description: string
    price: string
    imageUrl: string
    qty: number
  }
}

const handleCreateProduct = async (data: z.infer<typeof productSchema>) => {
  const response = await axiosInstance.post("/product/create", data)
  return response.data as ICreateProductResponse
}

export const useCreateProduct = () => {
  return useMutation<
    ICreateProductResponse,
    AxiosError<ICreateProductResponse>,
    z.infer<typeof productSchema>
  >({
    mutationKey: ["createProduct"],
    mutationFn: handleCreateProduct,
  })
}
