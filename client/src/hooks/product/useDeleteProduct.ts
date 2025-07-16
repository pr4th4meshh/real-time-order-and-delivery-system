import { axiosInstance } from "@/lib/api-instance"
import { ICreateProductResponse } from "./useCreateProduct"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

const handleDeleteProduct = async (id: string) => {
  const response = await axiosInstance.delete(`/product/${id}`)
  return response.data as ICreateProductResponse
}

export const useDeleteProduct = () => {
  return useMutation<ICreateProductResponse, AxiosError<ICreateProductResponse>, string>({
    mutationKey: ["deleteProduct"],
    mutationFn: handleDeleteProduct,
  })
}
