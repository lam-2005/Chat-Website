import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
import handleError from "../lib/errors.js";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decistion = await aj.protect(req);
    if (decistion.isDenied()) {
      if (decistion.reason.isRateLimit())
        return handleError(res, "Rate limit exceeded", 429);
      else if (decistion.reason.isBot())
        return handleError(res, "Bot access denied", 403);
      else return handleError(res, "Access denied by security policy", 403);
    }

    // Kiểm tra  bot giả mạo
    if (decistion.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected",
      });
    }
    next();
  } catch (error) {
    console.error("Arcjet Protection Error: ", error);
    next();
  }
};
