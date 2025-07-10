import express from 'express';

const app = express();
const PORT = 9000;

app.use(express.json());

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
