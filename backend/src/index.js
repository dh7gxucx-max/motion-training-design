const http = require('http');
const app = require('./app');
const { initSocket } = require('./socket');
const { connectDB } = require('./db/pool');
const { connectRedis } = require('./db/redis');

const server = http.createServer(app);

async function boot() {
  await connectDB();
  await connectRedis();
  initSocket(server);

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`✅ VALOR API running on http://localhost:${PORT}`);
  });
}

boot().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
