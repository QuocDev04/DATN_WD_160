import { StatusCodes } from "http-status-codes"
import CategoryProduct from "../models/CategoryProduct"


export const getAll = async (req, res) => {
    try {
        const getAll = await CategoryProduct.find()
        res.json(getAll)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "fix"
        })
    }
}

export const getId = async (req, res) => {
    try {
        const getId = await CategoryProduct.findById(req.params.id, req.body)
        res.json(getId)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "fix"
        })
    }
}

export const post = async (req, res) => {
    try {
        const room = await CategoryProduct.create(req.body);
        return res.status(StatusCodes.CREATED).json(room)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
}

export const put = async (req, res) => {
    try {
        const room = await CategoryProduct.findByIdAndUpdate(req.params.id, req.body)
        res.json(room)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "fix"
        })
    }
}

export const del = async (req, res) => {
    try {
        const del = await CategoryProduct.findByIdAndDelete(req.params.id)
        res.json(del)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "fix"
        })
    }
}