import Evaluate from "../models/evaluate";
import { StatusCodes } from "http-status-codes";
import UserSchema from "../models/user";
export const postComment = async (req, res) => {
    const { userId, roomId, description } = req.body;
  
    if (!userId || !roomId || !description) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Thiếu thông tin cần thiết để tạo bình luận",
      });
    }
  
    try {
      const user = await UserSchema.findById(userId);
  
      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          error: "Người dùng không tồn tại",
        });
      }
  
      // Tạo bình luận với thông tin người dùng
      const newComment = await Evaluate.create({
        user: {
          userId: user._id,
          name: user.name,
          avatar: user.avatar,
        },
        roomId,
        description,
      });
  
      res.status(StatusCodes.CREATED).json(newComment);
    } catch (error) {
      console.error("Error adding comment:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Lỗi máy chủ nội bộ" });
    }
  };
  export const getAllComment = async (req, res) => {
    try {
      const getAll = await Evaluate.find();
      res.json(getAll);
    } catch (error) {
      console.error("Error adding comment:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Lỗi máy chủ nội bộ" });
    }
  };
  export const getIdComment = async (req, res) => {
    const {roomId} = req.params
    try {
      const getId = await Evaluate.find({roomId});
      res.json(getId);
    } catch (error) {
      console.error("Error adding comment:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Lỗi máy chủ nội bộ" });
    }
  };