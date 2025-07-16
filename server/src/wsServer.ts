import { config } from "dotenv"
import { WebSocketServer } from "ws"
import http from "http"

config()

interface ExtWebSocket extends WebSocket {
  userId?: string
  role?: string
}

const wss = new WebSocketServer({ noServer: true })

const clients = new Map<string, ExtWebSocket[]>() // orderId -> sockets[]

wss.on("connection", (ws: ExtWebSocket) => {
  console.log("WS connection established")
  ws.onmessage = (message) => {
    try {
      const raw =
        typeof message.data === "string"
          ? message.data
          : message.data.toString()

      const data = JSON.parse(raw)

      // ✅ Now safely handle message types
      if (data.type === "subscribe") {
        const { orderId } = data
        if (!clients.has(orderId)) clients.set(orderId, [])
        clients.get(orderId)?.push(ws)
        console.log(`[WS] User subscribed to order ${orderId}`)
      } else if (data.type === "update") {
        const { orderId, status } = data
        const subscribers = clients.get(orderId) || []
        for (const client of subscribers) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({ type: "status-update", orderId, status })
            )
          }
        }
        console.log(`[WS] Status updated: ${orderId} => ${status}`)
      }
    } catch (err) {
      console.error("[WS] Invalid message", err)
    }
  }

  ws.onclose = () => {
    for (const [orderId, sockets] of clients) {
      clients.set(
        orderId,
        sockets.filter((s) => s !== ws)
      )
    }
  }
})

// Integrate with HTTP server
export const attachWebSocket = (server: http.Server) => {
  server.on("upgrade", (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req)
    })
  })
}
