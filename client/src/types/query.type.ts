export type CategoriesResType = { id: number; name: string; slug: string }[];

export type MyArticlesResType = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  thumbnail_image: string;
  status: string;
  published_at: string;
  reading_time: number;
  views_count: number;
  allow_comments: boolean;
  category: {
    id: number;
    name: string;
    slug: string;
  };
}[];

export type MyArticleCommentsResType = {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    phone_number: string;
    first_name: string;
    last_name: string;
    profile: {
      id: number;
      user_name: string;
      avatar: string;
    };
  };
}[];

export type GetArticlesResType = {
  data: {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    thumbnail_image: string;
    status: string;
    published_at: string;
    views_count: number;
    category: {
      id: number;
      name: string;
    };
    author: {
      id: number;
      first_name: string;
      last_name: string;
    };
  }[];
};

export type GetArticleDetailsResType = {
  data: {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    cover_image: string;
    status: string;
    published_at: string;
    reading_time: string;
    views_count: number;
    allow_comments: boolean;
    category: {
      id: number;
      name: string;
    };
    author: {
      id: number;
      first_name: string;
      last_name: string;
      profile: {
        avatar: string;
      };
    };
  };
};

export type GetArticleCommentsResType = {
  data: {
    id: number;
    content: string;
    createdAt: string;
    guest_name: string;
    user: {
      id: number;
      first_name: string;
      last_name: string;
      profile: {
        id: number;
        avatar: string;
        user_name: string;
      };
    };
  }[];
};
