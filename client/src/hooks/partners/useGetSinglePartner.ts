import { axiosInstance } from "@/lib/api-instance"
import { IPartnerResponse } from "@/types/partner.types"
import { useQuery } from "@tanstack/react-query"

const handleGetSinglePartner = async (id: string) => {
  const response = await axiosInstance.get(`/partner/${id}`)
  return response.data as IPartnerResponse;
}

export const useGetSinglePartner = (id: string) => {
  return useQuery({
    queryKey: ["partner"],
    queryFn: () => handleGetSinglePartner(id),
  })
}