import { axiosInstance } from "@/lib/api-instance"
import { IUserResponse } from "@/types/user.types"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import z from "zod"

export const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})

const handleUpdateUser = async ([id, data]: [ string, z.infer<typeof userSchema>]) => {
  const response = await axiosInstance.patch(`/user/${id}`, data)
  return response.data as IUserResponse;
}

export const useUpdateUser = () => {
  return useMutation<
    IUserResponse,
    AxiosError<IUserResponse>,
    [string, z.infer<typeof userSchema>]
  >({
    mutationKey: ["updateUser"],
    mutationFn: handleUpdateUser,
  })
}