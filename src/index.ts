import dotenv from "dotenv";
dotenv.config();

import { createApp } from "./app";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = createApp();

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Graceful shutdown
function shutdown(signal: string): void {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
