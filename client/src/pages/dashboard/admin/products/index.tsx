import DashboardLayout from "@/components/gui/DashboardLayout"
import ManageProductsTable from "./_components/ProductsManagementTable"

const AdminProducts = () => {
  return (
    <DashboardLayout role="admin">
        <ManageProductsTable />
    </DashboardLayout>
  )
}

export default AdminProducts