import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { sequelize } from "../../config/db.config";
import { UserModel } from "../user/user.model";
import { avatarSchema } from "./avatar.schema";
import { UserProfileModel } from "./user_profile.model";
import { UpdateProfileDto } from "./user_profile.validation";

export const getUserProfileService = async (userId: number) => {
  const user = await UserModel.findByPk(userId, {
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
    include: [
      {
        association: "profile",
      },
    ],
  });

  return {
    user,
  };
};

const avatarDirectory = path.resolve(process.cwd(), "public/uploads/avatars");

export const updateUserProfileService = async (
  userId: number,
  data: UpdateProfileDto,
  file?: Express.Multer.File,
) => {
  const { first_name, last_name, ...profileData } = data;

  let avatarPath: string | undefined;
  let savedFilePath: string | undefined;

  try {
    if (file) {
      const validation = avatarSchema.safeParse(file);

      if (!validation.success) {
        throw new Error("فایل آواتار معتبر نیست!");
      }

      await fs.mkdir(avatarDirectory, { recursive: true });

      const filename = `${crypto.randomUUID()}.webp`;

      savedFilePath = path.join(avatarDirectory, filename);
      avatarPath = `/uploads/avatars/${filename}`;

      const metadata = await sharp(file.buffer, {
        limitInputPixels: 25_000_000,
      }).metadata();

      if (!["jpeg", "png", "webp"].includes(metadata.format ?? "")) {
        throw new Error("فرمت تصویر معتبر نیست!");
      }

      await sharp(file.buffer, {
        limitInputPixels: 25_000_000,
      })
        .rotate()
        .resize(400, 400, { fit: "cover" })
        .webp({ quality: 80 })
        .toFile(savedFilePath);
    }

    const { result, oldAvatar } = await sequelize.transaction(
      async (transaction) => {
        await UserModel.update(
          {
            ...(first_name !== undefined && { first_name }),
            ...(last_name !== undefined && { last_name }),
          },
          {
            where: { id: userId },
            transaction,
          },
        );

        const existingProfile = await UserProfileModel.findOne({
          where: { user_id: userId },
          transaction,
        });

        const avatarValue = existingProfile?.get("avatar");

        const oldAvatar: string | null =
          typeof avatarValue === "string" ? avatarValue : null;

        await UserProfileModel.upsert(
          {
            ...profileData,
            user_id: userId,
            ...(avatarPath && { avatar: avatarPath }),
          },
          { transaction },
        );

        const result = await UserModel.findByPk(userId, {
          include: [{ association: "profile" }],
          transaction,
        });

        return { result, oldAvatar };
      },
    );

    if (avatarPath && oldAvatar?.startsWith("/uploads/avatars/")) {
      const oldFilename = path.posix.basename(oldAvatar);

      await fs.unlink(path.join(avatarDirectory, oldFilename)).catch(() => {});
    }

    return result;
  } catch (error) {
    if (savedFilePath) {
      await fs.unlink(savedFilePath).catch(() => {});
    }

    throw error;
  }
};
