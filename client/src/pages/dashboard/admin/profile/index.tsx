import DashboardLayout from "@/components/gui/DashboardLayout"
import ProfileComponent from "../../_components/ProfileComponent"
import { useStore } from "@/store/store"
import { IUser } from "@/types/user.types"

const AdminProfile = () => {
  const { user } = useStore()
  return (
    <DashboardLayout role="admin">
      <ProfileComponent user={user as IUser} />
    </DashboardLayout>
  )
}

export default AdminProfile
