import { axiosInstance } from "@/lib/api-instance"
import { IProduct } from "@/types/product.types"
import { useQuery } from "@tanstack/react-query"

interface IGetProductsResponse {
  success: boolean
  message: string
  data: IProduct[]
}

const handleGetProducts = async () => {
  const response = await axiosInstance.get("/product/all")
  return response.data as IGetProductsResponse
}

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["getProducts"],
    queryFn: handleGetProducts,
  })
}
