import jwt from "jsonwebtoken";
import User from "../models/User.js";
import env from "../configs/environment.config.js";

const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized - No token provided"));
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid token"));
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
    }

    socket.user = user;
    socket.userId = user._id.toString();
    console.log(
      `Socket authenticated for user: ${user.userName} (${user._id})`
    );
    next();
  } catch (error) {
    console.error("Error in socket authentication: ", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  }
};

export default socketAuthMiddleware;
