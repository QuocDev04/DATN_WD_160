import { StatusCodes } from "http-status-codes"
import Category from "../models/category"


export const getAll = async (req, res) => {
    try {
        const getAll = await Category.find()
        res.json(getAll)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "fix"
        })
    }
}

export const getId = async (req, res) => {
    try {
        const getId = await Category.findById(req.params.id, req.body)
        res.json(getId)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "fix"
        })
    }
}

export const post = async (req, res) => {
    try {
        const room = await Category.create(req.body);
        return res.status(StatusCodes.CREATED).json(room)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
}

export const put = async (req, res) => {
    try {
        const room = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.json(room)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "fix"
        })
    }
}

export const del = async (req, res) => {
    try {
        const del = await Category.findByIdAndDelete(req.params.id)
        res.json(del)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "fix"
        })
    }
}