import DashboardLayout from "@/components/gui/DashboardLayout"
import ProfileComponent from "../../_components/ProfileComponent"
import { useStore } from "@/store/store"
import { IUser } from "@/types/user.types"

const PartnerProfile = () => {
  const { user } = useStore()
  return (
    <DashboardLayout role="partner">
      <ProfileComponent user={user as IUser} />
    </DashboardLayout>
  )
}

export default PartnerProfile
