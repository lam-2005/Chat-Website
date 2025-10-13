import env from "../configs/environment.config.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import BaseController from "./base.controller.js";
import bcrypt from "bcryptjs";

const validate = {
  empty: "Hãy điền đầy đủ thông tin bắt buộc",
  passwordLength: "Mật khẩu ít nhất 6 ký tự",
  email: "Email không hợp lệ",
  userExist: "Email đã tồn tại",
};

class AuthController extends BaseController {
  static async signup(req, res) {
    const { userName, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {
      if (!userName || !email || !password)
        return new AuthController().handleError(res, validate.empty, 400);

      if (password.length < 6)
        return new AuthController().handleError(
          res,
          validate.passwordLength,
          400
        );

      if (!emailRegex.test(email))
        return new AuthController().handleError(res, validate.email, 400);

      const user = await User.findOne({ email });
      if (user)
        return new AuthController().handleError(res, validate.userExist, 400);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        email,
        userName,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });

      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.userName,
          env.CLIENT_URL
        );
      } catch (error) {
        console.error("Failed to send welcome email: ", error);
      }
    } catch (error) {
      console.error(error);
      jj;
      return new AuthController().handleError(res, error.message);
    }
  }

  static async login(req, res) {
    res.send("Login router");
  }

  static async logout(req, res) {
    res.send("Logout router");
  }
}

export default AuthController;
