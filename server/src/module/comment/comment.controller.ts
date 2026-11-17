import { Request, Response } from "express";
import {
  addNewCommentService,
  getMyArticleComments,
  getMyArticleCommentsService,
} from "./comment.service";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  id: number;
}

export const getMyArticleCommentsController = async (
  req: Request,
  res: Response,
) => {
  const articleId = Number(req.params.id);
  const result = await getMyArticleComments(articleId);

  return res.status(200).json({
    isSuccess: true,
    status: 200,
    data: result,
  });
};

export const getArticleCommentsController = async (
  req: Request,
  res: Response,
) => {
  const articleId = Number(req.params.articleId);
  const result = await getMyArticleCommentsService(articleId);

  return res.status(200).json({
    isSuccess: true,
    status: 200,
    data: result,
  });
};

export const addNewCommentController = async (req: Request, res: Response) => {
  const articleId = Number(req.params.articleId);
  const body = req.body;

  let userId: number | undefined;
  const token = req.cookies.access_token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!, {
        algorithms: ["HS256"],
      }) as TokenPayload;

      if (typeof decoded !== "string" && typeof decoded.userId === "number") {
        userId = decoded.userId;
      } else {
        return res.status(401).json({
          errorMessage: "توکن نامعتبر است",
        });
      }
    } catch {
      return res.status(401).json({
        errorMessage: "توکن نامعتبر یا منقضی شده است",
      });
    }
  }

  const result = await addNewCommentService(articleId, userId, body);

  return res.status(200).json({
    isSuccess: true,
    status: 200,
    message: "نظر شما با موفقیت ثبت شد!",
    data: result,
  });
};
