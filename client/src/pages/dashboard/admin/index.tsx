import DashboardLayout from "@/components/gui/DashboardLayout"
import AdminOrdersTable from "./_components/AdminOrdersTable"

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
        <AdminOrdersTable />
    </DashboardLayout>
  )
}

export default AdminDashboard