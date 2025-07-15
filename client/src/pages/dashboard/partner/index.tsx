import DashboardLayout from "@/components/gui/DashboardLayout"
import PartnerOrdersTable from "./_components/PartnerOrdersTable"

const PartnerDashboard = () => {
  return (
    <div>
      {/* <h1 className='text-center text-4xl font-bold mt-10'>🛍 Partner Dashboard</h1> */}
      <DashboardLayout role="partner">
        <PartnerOrdersTable />
      </DashboardLayout>
    </div>
  )
}

export default PartnerDashboard
