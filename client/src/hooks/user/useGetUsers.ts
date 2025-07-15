import { axiosInstance } from "@/lib/api-instance"
import { IUserResponse } from "@/types/user.types"
import { useQuery } from "@tanstack/react-query"

const handleGetAllUsers = async () => {
  const response = await axiosInstance.get("/user")
  return response.data as IUserResponse;
}

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => handleGetAllUsers(),
  })
}   