import { StatusCodes } from "http-status-codes"
import Article from "../models/article"


export const getAll = async (req, res) => {
    try {
        const getAll = await Article.find()
        res.json(getAll)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "fix"
        })
    }
}

export const getId = async (req, res) => {
    try {
        const getId = await Article.findById(req.params.id, req.body)
        res.json(getId)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "fix"
        })
    }
}

export const post = async (req, res) => {
    try {
        const article = await Article.create(req.body);
        return res.status(StatusCodes.CREATED).json(article)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
}

export const put = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body)
        res.json(article)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "fix"
        })
    }
}

export const del = async (req, res) => {
    try {
        const del = await Article.findByIdAndDelete(req.params.id)
        res.json(del)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "fix"
        })
    }
}