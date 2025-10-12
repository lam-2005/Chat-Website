import { Router } from "express";
const router = Router();

router.get("/login", (req, res) => res.send("Login router"));
router.get("/signup", (req, res) => res.send("signup router"));
router.get("/logout", (req, res) => res.send("logout router"));

export default router;
