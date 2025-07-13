import { Navigate, Outlet } from "react-router-dom"
import { useStore } from "./store/store"
import { IUser } from "./types/user.types"

export const AuthRoute = ({
  allowedRoles,
}: {
  allowedRoles: IUser["role"][]
}) => {
  const { user } = useStore()

  if (!user) return <Navigate to="/login" replace />
  if (!allowedRoles.includes(user.role))
    return <Navigate to="/" replace />

  return <Outlet />
}
