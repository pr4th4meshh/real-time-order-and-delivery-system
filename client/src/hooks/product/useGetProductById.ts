import { axiosInstance } from "@/lib/api-instance"
import { useQuery } from "@tanstack/react-query"
import { ICreateProductResponse } from "./useCreateProduct"

const handleGetProductById = async (id: string) => {
  const response = await axiosInstance.get(`/product/${id}`)
  return response.data as ICreateProductResponse
}

export const useGetProductById = (id: string) => {  
    return useQuery({
      queryKey: ["getProductById", id],
      queryFn: () => handleGetProductById(id),
    })
  }
