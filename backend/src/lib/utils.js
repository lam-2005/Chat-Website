import jwt from "jsonwebtoken";
import env from "../configs/environment.config.js";

export const generateToken = (userId, res) => {
  const { JWT_SECRET } = env;
  if (!JWT_SECRET) throw new Error("Chưa khai báo biến môi trường JWT_SECRET ");
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // chống tấn công XSS
    sameSite: "strict", //chống CSRF attacks
    secure: env.NODE_ENV === "development" ? false : true,
  });
  return token;
};
