import { UpdateProfileReqType } from "./mutation.type";

export type UpdateProfileFormType = UpdateProfileReqType & {
  phone_number?: string;
};

export type CreateNewArticleFormType = {
  title: string;
  excerpt: string;
  category_id: number | null;
  content: string;
  cover_image: File | null;
  thumbnail_image: File | null;
  status: "draft" | "published" | null;
  allow_comments: string | null;
};
