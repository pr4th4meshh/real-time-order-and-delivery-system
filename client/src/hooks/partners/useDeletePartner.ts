import { axiosInstance } from "@/lib/api-instance";
import { IPartnerResponse } from "@/types/partner.types"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios";

const handleDeletePartner = async (id: string) => {
  const response = await axiosInstance.delete(`/partner/${id}`)
  return response.data as IPartnerResponse;
}

export const useDeletePartner = () => {
  return useMutation<
    IPartnerResponse,
    AxiosError<IPartnerResponse>,
    string
  >({
    mutationKey: ["deletePartner"],
    mutationFn: handleDeletePartner,
  })
}