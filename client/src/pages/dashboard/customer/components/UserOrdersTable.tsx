import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IOrderResponse, useGetOrders } from "@/hooks/orders/useGetOrders"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { useEffect, useMemo, useState } from "react"
import { connectWebSocket, subscribeToOrder } from "@/lib/ws-client"

type Order = IOrderResponse["data"][number]

interface StatusUpdateMessage {
  type: "status-update"
  orderId: string
  status: Order["status"]
}

type WebSocketMessage = StatusUpdateMessage | {
  type: "unknown" // fallback for future extension
  [key: string]: unknown
}

const UserOrdersTable = () => {
  const { data, isLoading } = useGetOrders()

  const initialOrders = useMemo<Order[]>(() => data?.data ?? [], [data?.data])
  const [orders, setOrders] = useState<Order[]>([])

  // Sync fetched orders to local state
  useEffect(() => {
    setOrders(initialOrders)
  }, [initialOrders])

  // WebSocket setup
  useEffect(() => {
    if (initialOrders.length === 0) return

    const handleMessage = (msg: WebSocketMessage) => {
      if (msg.type === "status-update") {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === msg.orderId ? { ...order, status: msg.status } : order
          )
        )
      }
    }

    connectWebSocket(handleMessage, () => {
      initialOrders.forEach((order) => {
        subscribeToOrder(order.id)
      })
    })

    // Also subscribe immediately in case readyState is already open
    initialOrders.forEach((order) => {
      subscribeToOrder(order.id)
    })
  }, [initialOrders])

  if (isLoading) return <div className="p-4">Loading your orders...</div>

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center p-4">
          You haven’t placed any orders yet.
        </div>
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
                          <span className="font-medium">
                            {item.product.name}
                          </span>{" "}
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
