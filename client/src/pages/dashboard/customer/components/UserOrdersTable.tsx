import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetOrders } from "@/hooks/orders/useGetOrders"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

const UserOrdersTable = () => {
  const { data, isLoading } = useGetOrders()

  const orders = data?.data || []

  if (isLoading) return <div className="p-4">Loading your orders...</div>

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center p-4">You haven’t placed any orders yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Placed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {order.items.map((item) => (
                        <li key={item.id}>
                          📦{" "}
                          <span className="font-medium">{item.product.name}</span>{" "}
                          x {item.qty}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(order.createdAt), {
                      addSuffix: true,
                    })}
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

export default UserOrdersTable
