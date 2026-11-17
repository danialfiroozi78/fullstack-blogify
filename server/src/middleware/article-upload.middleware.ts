import multer from "multer";

export const articleUpload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 2,
  },

  fileFilter: (_req, file, callback) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(new Error("فرمت تصویر معتبر نیست"));
    }

    callback(null, true);
  },
}).fields([
  { name: "thumbnail_image", maxCount: 1 },
  { name: "cover_image", maxCount: 1 },
]);
