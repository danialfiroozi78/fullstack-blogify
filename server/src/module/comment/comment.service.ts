import { CommentModel } from "./comment.model";
import { UserModel } from "../user/user.model";
import { UserProfileModel } from "../user_profile/user_profile.model";

type CreateCommentBody = {
  content: string;
  guest_name?: string;
  guest_email?: string;
};

export const getMyArticleComments = async (articleId: number) => {
  const comments = await CommentModel.findAll({
    where: { article_id: articleId },
    attributes: ["id", "content", "createdAt"],
    include: {
      as: "user",
      model: UserModel,
      attributes: ["id", "phone_number", "first_name", "last_name"],
      include: {
        model: UserProfileModel,
        as: "profile",
        attributes: ["id", "user_name", "avatar"],
      },
    },
  });

  return comments.map((comment) => {
    const plainComment = comment.get({ plain: true });

    return {
      ...plainComment,

      createdAt: plainComment.createdAt
        ? new Intl.DateTimeFormat("fa-IR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: "Asia/Tehran",
          }).format(new Date(plainComment.createdAt))
        : null,
    };
  });
};

export const getMyArticleCommentsService = async (articleId: number) => {
  const comments = await CommentModel.findAll({
    where: { article_id: articleId },
    order: [["created_at", "DESC"]],
    attributes: ["id", "content", "created_at", "guest_name"],
    include: [
      {
        model: UserModel,
        as: "user",
        attributes: ["id", "first_name", "last_name"],
        include: {
          model: UserProfileModel,
          as: "profile",
          attributes: ["id", "avatar", "user_name"],
        },
      },
    ],
  });

  return comments.map((comment) => {
    const plainComment = comment.get({ plain: true });

    return {
      ...plainComment,

      createdAt: plainComment.created_at
        ? new Intl.DateTimeFormat("fa-IR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: "Asia/Tehran",
          }).format(new Date(plainComment.created_at))
        : null,
    };
  });
};

export const addNewCommentService = async (
  articleId: number,
  userId: number | undefined,
  body: CreateCommentBody,
) => {
  const { content, guest_name, guest_email } = body;

  return CommentModel.create({
    article_id: articleId,
    user_id: userId ?? null,
    content,
    guest_name: userId ? null : guest_name,
    guest_email: userId ? null : guest_email,
  });
};
