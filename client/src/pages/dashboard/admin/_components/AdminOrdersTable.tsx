import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetOrders } from "@/hooks/orders/useGetOrders"

const AdminOrdersTable = () => {
  const { data, isLoading } = useGetOrders()

  const orders = data?.data || []

  if (isLoading) return <div className="p-4">Loading orders...</div>
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Admin Orders</h2>
      </div>

      {orders.length === 0 ? (
        <div className="text-center p-4">No orders found</div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {order.items.map((item) => (
                        <li key={item.id}>
                          📦{" "}
                          <span className="font-medium">
                            {item.product.name}
                          </span>{" "}
                          x {item.qty}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell className="capitalize font-medium">
                    {order.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

export default AdminOrdersTable
