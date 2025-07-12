import express from 'express';
import authRouter from "./routes/auth.route"

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/v1/auth", authRouter)

app.get('/', (_req, res) => {
  res.json({
    message: `Server running on port ${PORT}`
  })
});

app.get('/health', (_req, res) => {
  res.json({
    status: "healthy",
    time: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
