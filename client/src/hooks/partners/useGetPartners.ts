import { axiosInstance } from "@/lib/api-instance"
import { IPartnerResponse } from "@/types/partner.types"
import { useQuery } from "@tanstack/react-query"

const handleGetPartners = async () => {
  const response = await axiosInstance.get("/partner")
  return response.data as IPartnerResponse;
}

export const useGetPartners = () => {
  return useQuery({
    queryKey: ["partners"],
    queryFn: () => handleGetPartners(),
  })
}