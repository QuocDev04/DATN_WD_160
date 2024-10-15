import User from "../models/user";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { Register } from "../schema/validate";
export const getAllUser = async (req, res) => {
    try {
        const getAll = await User.find()
        res.json(getAll);
    } catch (error) {
        res.status(400).json({
            message: "fix",
        });
    }
}
export const getIdUser = async (req, res) => {
    try {
        const getId = await User.findById(req.params.id, req.body)
        res.json(getId)
    } catch (error) {
        res.status(400).json({
            message: "fix"
        })
    }
}
export const putIdUser = async (req, res) => {
    try {
        const put = await User.findByIdAndUpdate(req.params.id, req.body);
        res.json(put);
    } catch (error) {
        res.status(400).json({
            message: "fix",
        });
    }
};
export const delIdUser = async (req, res) => {
    try {
        const del = await User.findByIdAndDelete(req.params.id);
        res.json(del);
    } catch (error) {
        res.status(400).json({
            message: "fix",
        });
    }
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, "123456", { expiresIn: "1y" });
};
const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, "123456", { expiresIn: "1m" });
};
export const register = async (req, res) => {
    const { email, password } = req.body;
    const { error } = Register.validate(req.body, { abortEarly: false });
    if (error) {
        const messages = error.details.map((item) => item.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            messages,
        });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            messages: ["Email đã tồn tại"],
        });
    }
    // Mã hóa mật khẩu
    const hashedPassword = await bcryptjs.hash(password, 10);
    // Nếu không có user nào trong hệ thống thì tạo user đầu tiên là admin
    const role = (await User.countDocuments({})) === 0 ? "admin" : "user";

    const user = await User.create({
        ...req.body,
        password: hashedPassword,
        role,
    });
    return res.status(StatusCodes.CREATED).json({
        user,
    });
};
export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                messages: ["Email không tồn tại"],
            });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                messages: ["Mật khẩu không chính xác"],
            });
        }
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);
        return res.status(StatusCodes.OK).json({
            accessToken,
            refreshToken,
            role: user.role,
            name: user.name,
            email: user.email,
            userId: user.id,
        });

    } catch (error) {
        console.error(`Error finding user with email ${email}:`, error);
    }
};