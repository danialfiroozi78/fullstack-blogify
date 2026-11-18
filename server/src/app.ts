import express from "express";
import path from "node:path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import authRoutes from "./module/auth/auth.routes";
import profileRoutes from "./module/user_profile/user_profile.routes";
import articleRoutes from "./module/article/article.routes";
import { errorMiddleware } from "./middleware/errors.middleware";
import { authMiddleware } from "./middleware/auth.middleware";
import categoryRoute from "./module/category/category.route";
import commentRoutes from "./module/comment/comment.routes";
import { UPLOAD_DIR } from "./config/upload.config";

config();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use("/uploads", express.static(UPLOAD_DIR));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/profile", authMiddleware, profileRoutes);
app.use("/api/categories", categoryRoute);
app.use("/api/articles", articleRoutes);
app.use("/api/comments", commentRoutes);

// error handling
app.use(errorMiddleware);

export default app;
