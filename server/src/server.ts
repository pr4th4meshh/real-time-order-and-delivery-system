import express from "express"
import authRouter from "./routes/auth.route"
import productRouter from "./routes/product.route"
import orderRouter from "./routes/order.route"
import partnerRouter from "./routes/partner.route"
import userRouter from "./routes/user.route"
import cors from "cors"
import cookieParser from "cookie-parser"
import http from "http"
import { attachWebSocket } from "./wsServer"

const app = express()
const PORT = process.env.PORT

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "https://orders.prathamesssh.xyz"]
app.use(cors({ origin: allowedOrigins, credentials: true }))

app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/product", productRouter)
app.use("/api/v1/order", orderRouter)
app.use("/api/v1/partner", partnerRouter)
app.use("/api/v1/user", userRouter)

app.get("/", (_req, res) => {
  res.json({
    message: `Server running on port ${PORT}`,
  })
})

app.get("/health", (_req, res) => {
  res.json({
    status: "healthy",
    time: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

const server = http.createServer(app)
attachWebSocket(server)

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
  console.log(`📡 WS listening on ws://localhost:${PORT}`)
})
