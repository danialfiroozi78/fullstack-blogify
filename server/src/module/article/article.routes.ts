import { Router } from "express";
import {
  createArticleController,
  deleteMyArticleDetailsController,
  getArticleDetailsController,
  getArticlesController,
  getMyArticleDetailsController,
  getMyArticlesController,
} from "./article.controller";
import { articleUpload } from "../../middleware/article-upload.middleware";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post("/create", authMiddleware, articleUpload, createArticleController);
router.get("/me", authMiddleware, getMyArticlesController);
router.get("/me/:id", authMiddleware, getMyArticleDetailsController);
router.delete("/me/:id", authMiddleware, deleteMyArticleDetailsController);

// manage public articles
router.get("/", getArticlesController);
router.get("/details/:slug", getArticleDetailsController);

export default router;
