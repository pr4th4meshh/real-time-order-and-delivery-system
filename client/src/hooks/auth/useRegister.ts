import { axiosInstance } from "@/lib/api-instance"
import type { registerSchema } from "@/lib/zod/registerSchema"
import type { IRegisterResponse } from "@/types/auth.types"
import { useMutation } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import type z from "zod"

const handleRegister = async (registerData: z.infer<typeof registerSchema>) => {
  const response = await axiosInstance.post("/auth/register", registerData)
  return response.data as IRegisterResponse;
}

export const useRegister = () => {
  return useMutation<
    IRegisterResponse,
    AxiosError<IRegisterResponse>,
    z.infer<typeof registerSchema>
  >({
    mutationKey: ["register"],
    mutationFn: handleRegister,
  })
}
