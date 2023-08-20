const config = require('config')
const { app } = require('./app.js');
const { connectDB } = require('./database/db');
connectDB();

const port = config.get("app.port") || 3001;

const server = app.listen(port, () =>
  console.log(`[server] Connected to port ${port}`)
);

process.on('unhandledRejection', (err) => {
  console.error(`[server] An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});