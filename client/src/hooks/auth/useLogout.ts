import { axiosInstance } from "@/lib/api-instance"
import { useStore } from "@/store/store"
import { ILogoutResponse } from "@/types/auth.types"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const handleLogout = async () => {
    const response = await axiosInstance.get("/auth/logout")
    return response.data as ILogoutResponse
}

export const useLogout = () => {
    const { logoutUser, setIsAuthorized } = useStore()
    return useMutation({
      mutationFn: handleLogout,
      onSuccess: (data) => {
        if (data.success) {
          logoutUser()
          setIsAuthorized(false)
          toast.info("Logout successful")
        }
      },
      onError: () => {
        toast.error("Logout failed")
      },
    })
  }