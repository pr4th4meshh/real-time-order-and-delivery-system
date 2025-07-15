import { axiosInstance } from "@/lib/api-instance";
import { IUserResponse } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";

const handleGetSingleUser = async (id: string) => {
  const response = await axiosInstance.get(`/user/${id}`)
  return response.data as IUserResponse;
}

export const useGetSingleUser = (id: string) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => handleGetSingleUser(id),
  })
}