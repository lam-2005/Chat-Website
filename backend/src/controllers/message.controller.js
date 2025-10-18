import Message from "../models/Message.js";
import User from "../models/User.js";
import handleError from "../lib/errors.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

class MessageController {
  static async getAllContacts(req, res) {
    try {
      const loggedInUserId = req.user._id;
      const filteredUsers = await User.find({
        _id: { $ne: loggedInUserId },
      }).select("-password");

      res.status(200).json(filteredUsers);
    } catch (error) {
      console.error("Error in getAllContacts controller: ", error);
      return handleError(res);
    }
  }

  static async getChatPartners(req, res) {
    try {
      const loggedInUserId = req.user._id;

      // lấy toàn bộ tin nhắn đã nhận hoặc đã gửi từ người dùng
      const messages = await Message.find({
        $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
      });

      const chatPartnerIds = [
        ...new Set(
          messages.map((msg) =>
            msg.senderId.toString() === loggedInUserId.toString()
              ? msg.receiverId.toString()
              : msg.senderId.toString()
          )
        ),
      ];

      const chatPartners = await User.find({
        _id: { $in: chatPartnerIds },
      }).select("-password");

      res.status(200).json(chatPartners);
    } catch (error) {
      console.error("Error in getChatPartners controller: ", error);
      return handleError(res);
    }
  }

  static async getMessagesByUserId(req, res) {
    try {
      const myId = req.user._id;
      const { id: userToChatId } = req.params;

      const messages = await Message.find({
        $or: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId },
        ],
      });

      res.status(200).json({ messages });
    } catch (error) {
      console.error("Error in getMessagesByUserId controller", error);
      return handleError(res);
    }
  }

  static async sendMessage(req, res) {
    try {
      const { text, image, icon } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;

      if (!text && !image && !icon)
        return handleError(res, "Text or Image is required", 400);

      if (senderId.equals(receiverId))
        return handleError(res, "Cannot send messages to yourself", 400);

      const receiverExists = await User.exists({ _id: receiverId });
      if (!receiverExists) return handleError(res, "Receiver not found", 404);

      let imageUrl;
      if (image) {
        const uploadRes = await cloudinary.uploader.upload(image);
        imageUrl = uploadRes.secure_url;
      }

      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image,
        icon,
      });

      const savedNewMessage = await newMessage.save();

      // realtime  = socketio
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }

      res.status(201).json(savedNewMessage);
    } catch (error) {
      console.error("Error in sendMessage controller", error);
      return handleError(res);
    }
  }
}
export default MessageController;
