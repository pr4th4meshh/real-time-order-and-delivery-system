let socket: WebSocket | null = null

export const connectWebSocket = (
  onMessage: (data: any) => void,
  onReconnect?: () => void
) => {
  socket = new WebSocket("wss://orders.prathamesssh.xyz/ws")

  socket.onopen = () => {
    console.log("✅ WebSocket connected")
    onReconnect?.()
  }

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data)
      onMessage(data)
    } catch (error) {
      console.error("WS parse error", error)
    }
  }

  socket.onclose = () => {
    console.log("❌ WebSocket disconnected, retrying in 3s...")
    setTimeout(() => {
      connectWebSocket(onMessage, onReconnect)
    }, 3000)
  }

  socket.onerror = (err) => {
    console.error("WebSocket error", err)
  }
}


export const subscribeToOrder = (orderId: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "subscribe", orderId })) 
    }
  }
  
  export const sendOrderUpdate = (orderId: string, status: string) => {
    if (!socket) {
      console.warn("🧑‍💻 WebSocket not connected yet")
      return
    }
  
    if (socket.readyState !== WebSocket.OPEN) {
      socket.addEventListener("open", () => {
        socket?.send(JSON.stringify({ type: "update", orderId, status }))
      }, { once: true })
    } else {
      socket.send(JSON.stringify({ type: "update", orderId, status }))
    }
  
    console.log("🛰️ Status sent:", orderId, status)
  }
  