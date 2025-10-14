import { Router } from "express";
import MessageController from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
const router = Router();

router.use(arcjetProtection, protectRoute);

router.get("/contacts", MessageController.getAllContacts);
router.get("/chats", MessageController.getChatPartners);
router.post("/send/:id", MessageController.sendMessage);
router.get("/:id", MessageController.getMessagesByUserId);

export default router;
