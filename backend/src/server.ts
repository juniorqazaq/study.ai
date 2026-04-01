import dotenv from "dotenv";
dotenv.config();
import { env } from './config/env.js';
import { app } from './app.js';

const server = app.listen(env.PORT, () => {
  console.log(`Auth API listening on http://localhost:${env.PORT}`);
});

const shutdown = () => {
  server.close(() => process.exit(0));
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
