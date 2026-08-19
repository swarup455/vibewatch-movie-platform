import "dotenv/config"
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./modules/auth/authRoutes.js";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import "./modules/discover/discover.worker.js"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

// ---------- All routes are mentioned here ----------
app.use("/api/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});