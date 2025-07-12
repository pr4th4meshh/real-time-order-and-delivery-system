import { axiosInstance } from "@/lib/api-instance"
import { useQuery } from "@tanstack/react-query"

export const checkUserStatus = async () => {
  const response = await axiosInstance.get("/auth/user")
  return {
    isAuthorized: response.status === 200,
    data: response.data,
  }
}

export const useIsAuthenticated = () => {
  return useQuery({
    queryKey: ["checkUserStatus"],
    queryFn: checkUserStatus,
  })
}
