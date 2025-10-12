import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
const router = Router();

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
router.get("/logout", AuthController.logout);

export default router;
