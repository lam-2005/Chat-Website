import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
const router = Router();

router.use(arcjetProtection);

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
router.post("/logout", AuthController.logout);
router.put("/update-profile", protectRoute, AuthController.update);
router.get("/check", protectRoute, (req, res) =>
  res.status(200).json(req.user)
);

export default router;
