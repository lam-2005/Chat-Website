import env from "../configs/environment.config.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import cloudinary from "../lib/cloudinary.js";
import handleError from "../lib/errors.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const validate = {
  empty: "Hãy điền đầy đủ thông tin bắt buộc",
  passwordLength: "Mật khẩu ít nhất 6 ký tự",
  email: "Email không hợp lệ",
  userExist: "Email đã tồn tại",
};

class AuthController {
  static async signup(req, res) {
    const { userName, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {
      if (!userName || !email || !password)
        return handleError(res, validate.empty, 400);

      if (password.length < 6)
        return handleError(res, validate.passwordLength, 400);

      if (!emailRegex.test(email)) return handleError(res, validate.email, 400);

      const user = await User.findOne({ email });
      if (user) return handleError(res, validate.userExist, 400);

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
      return handleError(res);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!email || !password) return handleError(res, validate.empty, 400);

      if (!user) return handleError(res, "Thông tin không hợp lệ", 400);

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect)
        return handleError(res, "Thông tin không hợp lệ", 400);
      generateToken(user._id, res);
      res.status(200).json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        profilePic: user.profilePic,
      });
    } catch (error) {
      console.error("Lỗi khi đăng nhập: ", error);
      return handleError(res);
    }
  }

  static async logout(_, res) {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Đăng xuất thành công" });
  }

  static async update(req, res) {
    const { profilePic } = req.body;
    try {
      if (!profilePic) return handleError(res, "Ảnh đại diện là bắc buộc", 400);

      const userId = req.user._id;

      const uploadRes = await cloudinary.uploader.upload(profilePic);

      const upadtedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: uploadRes.secure_url },
        { new: true }
      );

      res.status(200).json(upadtedUser);
    } catch (error) {
      console.error("Error in update profile: ", error);
      return handleError(res);
    }
  }
}

export default AuthController;
