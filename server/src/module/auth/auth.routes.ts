import { validateBody } from "./../../middleware/validate.middleware";
import { Router } from "express";
import {
  logOutController,
  sendOtpController,
  verifyOtpController,
} from "./auth.controller.js";
import { sendOtpSchema, verifyOtpSchema } from "./auth.validation.js";

const router = Router();

router.post("/send-otp", validateBody(sendOtpSchema), sendOtpController);
router.post("/verify-otp", validateBody(verifyOtpSchema), verifyOtpController);
router.post("/logout", logOutController);

export default router;
