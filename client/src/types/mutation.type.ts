import { CreateNewArticleFormType } from "@/types/form.type";

export type SendOtpReqType = {
  phone_number: string;
};
export type SendOtpResType = {
  isNewUser: boolean;
  expires_in: string;
  code: string;
};

export type VerifyOtpReqType = {
  code: string;
  phone_number: string;
  first_name?: string;
  last_name?: string;
};
export type VerifyOtpResType = {
  isNewUser: boolean;
  userId: number;
};

export type UpdateProfileReqType = {
  first_name?: string;
  last_name?: string;
  website?: string;
  birth_date?: string;
  email?: string;
  bio?: string;
  avatar?: File | null;
  user_name?: string;
};
export type UpdateProfileResType = {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  profile: {
    birth_date?: string;
    email?: string;
    website?: string;
    bio?: string;
    avatar?: string;
    user_name?: string;
  };
};

export type CreateNewArticleReqType = {
  title: string;
  excerpt: string;
  category_id: number;
  content: string;
  cover_image: string;
  status: "draft" | "published";
  allow_comments: boolean;
};
