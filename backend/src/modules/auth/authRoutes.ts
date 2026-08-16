import { Router } from "express";
import { googleRedirect, googleCallback, refreshAccessToken, logout, getMe } from "./authController.js";
import { authenticate } from "../../middlewares/authMiddleware.js";

const router = Router();

router.get("/google", googleRedirect);
router.get("/google/callback", googleCallback);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logout);
router.get("/me", authenticate, getMe);

export default router;