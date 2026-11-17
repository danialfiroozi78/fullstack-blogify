import { UserModel } from "../module/user/user.model.js";
import { UserProfileModel } from "../module/user_profile/user_profile.model";
import { ArticleModel } from "../module/article/article.model";
import { CategoryModel } from "../module/category/category.model";
import { CommentModel } from "../module/comment/comment.model";

// user relations
UserModel.hasOne(UserProfileModel, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
    onDelete: "CASCADE",
  },
  as: "profile",
  inverse: {
    as: "user",
  },
});

// articles relations
UserModel.hasMany(ArticleModel, {
  foreignKey: "author_id",
  as: "articles",
  inverse: {
    as: "author",
  },
});

// category relations
CategoryModel.hasMany(ArticleModel, {
  foreignKey: "category_id",
  as: "articles",
  inverse: {
    as: "category",
  },
});

// comments relation
UserModel.hasMany(CommentModel, {
  foreignKey: "user_id",
  as: "comments",
});
CommentModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
});
ArticleModel.hasMany(CommentModel, {
  foreignKey: "article_id",
  as: "comments",
});
CommentModel.belongsTo(ArticleModel, {
  foreignKey: "article_id",
  as: "article",
});
