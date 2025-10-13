import env from "../configs/environment.config.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import handleError from "../lib/errors.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return handleError(res, "Unauthorized - No token provided", 401);

    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (!decoded) return handleError(res, "Unauthorized - Invalid token", 401);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return handleError(res, "user not found", 404);

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware: ", error);
    return handleError(res);
  }
};
