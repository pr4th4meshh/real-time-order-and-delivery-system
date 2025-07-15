import DashboardLayout from "@/components/gui/DashboardLayout"
import UserOrdersTable from "./components/UserOrdersTable"

const CustomerDashboard = () => {
  return (
    <DashboardLayout role="customer">
      <UserOrdersTable />
    </DashboardLayout>
  )
}

export default CustomerDashboard
