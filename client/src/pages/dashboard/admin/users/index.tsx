import DashboardLayout from "@/components/gui/DashboardLayout"
import ManageUsersTable from "../_components/ManageUsersTable"

const ManageUsers = () => {
  return (
    <DashboardLayout role="admin">
        <ManageUsersTable />
    </DashboardLayout>
  )
}

export default ManageUsers