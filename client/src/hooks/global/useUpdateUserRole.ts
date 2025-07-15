import { axiosInstance } from "@/lib/api-instance"
import { IPartnerResponse } from "@/types/partner.types"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

const handleUpdateUserRole = async ([id, role]: [string, string]) => {
  const response = await axiosInstance.patch(`/partner/${id}`, { role })
  return response.data as IPartnerResponse
}

export const useUpdateUserRole = () => {
  return useMutation<
    IPartnerResponse,
    AxiosError<IPartnerResponse>,
    [string, string]
  >({
    mutationKey: ["updateUserRole"],
    mutationFn: handleUpdateUserRole,
  })
}
