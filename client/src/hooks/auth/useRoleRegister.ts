import { axiosInstance } from "@/lib/api-instance";
import { registerSchema } from "@/lib/zod/registerSchema";
import { IRegisterResponse } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import z from "zod";

export const useRoleRegister = (role: 'customer' | 'partner' | 'admin') => {
  return useMutation<
    IRegisterResponse,
    AxiosError<IRegisterResponse>,
    z.infer<typeof registerSchema>
  >({
    mutationKey: ["register", role],
    mutationFn: async (registerData) => {
      const response = await axiosInstance.post("/auth/register", {
        ...registerData,
        role
      });
      return response.data;
    }
  });
};