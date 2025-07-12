import { axiosInstance } from "@/lib/api-instance";
import type { loginSchema } from "@/lib/zod/loginSchema";
import type { ILoginResponse } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type z from "zod";

const handleLogin = async (loginData: z.infer<typeof loginSchema>) => {
  const response = await axiosInstance.post("/auth/login", loginData)
  return response.data as ILoginResponse;
}

export const useLogin = () => {
  return useMutation<
    ILoginResponse,
    AxiosError<ILoginResponse>,
    z.infer<typeof loginSchema>
  >({
    mutationKey: ["login"],
    mutationFn: handleLogin,
  })
}