import dotenv from "dotenv";
dotenv.config();

import app from "./main.js";
import { connectDB } from "./libs/db.js";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, async () => {
  await connectDB();
  console.log("Server starts successfully");
});

// Listen or server listening errors
server.on("error", (err) => {
  console.error("Server failed to start:", err.message);
});
