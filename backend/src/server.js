import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import env from "./configs/environment.config.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
const __dirname = path.resolve();

const PORT = env.PORT;
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.use((req, res) =>
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
  );
}

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
