import { useMutation } from "@tanstack/react-query"
import { ICreateProductResponse } from "./useCreateProduct"
import { AxiosError } from "axios"
import z from "zod"
import { updateProductSchema } from "@/lib/zod/productSchema"
import { axiosInstance } from "@/lib/api-instance"

type UpdateProductInput = {
    id: string
    data: z.infer<typeof updateProductSchema>
  }

const handleUpdateProduct = async ({id,data}: UpdateProductInput) => {
  const response = await axiosInstance.patch(`/product/${id}`, data)
  return response.data as ICreateProductResponse
}

export const useUpdateProduct = () => {
  return useMutation<
    ICreateProductResponse,
    AxiosError<ICreateProductResponse>,
    UpdateProductInput
  >({
    mutationKey: ["updateProduct"],
    mutationFn: handleUpdateProduct,
  })
}