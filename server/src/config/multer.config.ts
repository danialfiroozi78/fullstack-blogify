import multer from "multer";

export const uploadAvatar = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 2 * 1024 * 1024,
    files: 1,
  },
}).single("avatar");
