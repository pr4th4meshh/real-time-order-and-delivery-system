import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useGetOrders } from "@/hooks/orders/useGetOrders"
import { useAcceptOrder } from "@/hooks/orders/useAcceptOrder"
import { useUpdateOrderStatus } from "@/hooks/orders/useUpdateOrderStatus"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { connectWebSocket, sendOrderUpdate } from "@/lib/ws-client"

const PartnerOrdersTable = () => {
  const [type, setType] = useState<"available" | "mine">("available")
  const { data, isLoading, refetch } = useGetOrders(type)
  const { mutate: acceptOrder, isPending: accepting } = useAcceptOrder()
  const { mutate: updateStatus, isPending: updating } = useUpdateOrderStatus()

  useEffect(() => {
    connectWebSocket((data) => {
      console.log("Partner received message:", data)
    })
  }, [])

  const handleAccept = (id: string) => {
    acceptOrder(id, {
      onSuccess: () => {
        toast.success("Order accepted successfully!")
        refetch()
        sendOrderUpdate(id, "accepted")
      },
      onError: () => toast.error("Failed to accept order"),
    })
  }

  const handleStatusChange = (id: string, nextStatus: string) => {
    updateStatus([id, nextStatus], {
      onSuccess: () => {
        toast.success(`Order marked as ${nextStatus}`)
        sendOrderUpdate(id, nextStatus)
        refetch()
      },
      onError: () => toast.error("Failed to update status"),
    })
  }

  if (isLoading) return <div className="p-4">Loading orders...</div>

  const orders = data?.data || []

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Partner Orders</h2>
        <div className="space-x-2">
          <Button
            variant={type === "available" ? "default" : "outline"}
            onClick={() => setType("available")}
          >
            Available Orders
          </Button>
          <Button
            variant={type === "mine" ? "default" : "outline"}
            onClick={() => setType("mine")}
          >
            My Orders
          </Button>
        </div>
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id.slice(0, 6)}...</TableCell>
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
                  <TableCell className="space-x-2">
                    {order.status === "placed" && !order.partnerId && (
                      <Button
                        size="sm"
                        onClick={() => handleAccept(order.id)}
                        disabled={accepting}
                      >
                        Accept
                      </Button>
                    )}

                    {order.status === "accepted" && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleStatusChange(order.id, "picked")}
                        disabled={updating}
                      >
                        Mark Picked
                      </Button>
                    )}

                    {order.status === "picked" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleStatusChange(order.id, "delivered")
                        }
                        disabled={updating}
                      >
                        Mark Delivered
                      </Button>
                    )}
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

export default PartnerOrdersTable
