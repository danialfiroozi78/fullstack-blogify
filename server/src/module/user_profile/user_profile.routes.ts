import { Router } from "express";
import {
  getUserProfileController,
  updateUserProfileController,
} from "./user_profile.controller";
import { updateProfileSchema } from "./user_profile.validation";
import { validateBody } from "../../middleware/validate.middleware";
import { uploadAvatar } from "../../config/multer.config";

const router = Router();

router.get("/", getUserProfileController);
router.patch(
  "/update",
  uploadAvatar,
  validateBody(updateProfileSchema),
  updateUserProfileController,
);

export default router;
