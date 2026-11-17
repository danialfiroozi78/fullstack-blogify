import { Router } from "express";
import {
  addNewCommentController,
  getArticleCommentsController,
  getMyArticleCommentsController,
} from "./comment.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

// get my articles comments
router.get("/article/me/:id", authMiddleware, getMyArticleCommentsController);

// get public comments
router.get("/article/:articleId", getArticleCommentsController);
router.post("/article/:articleId", addNewCommentController);

export default router;
