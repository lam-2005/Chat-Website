import { Router } from "express";
const router = Router();

router.get("/send", (req, res) => res.send("Message router"));

export default router;
