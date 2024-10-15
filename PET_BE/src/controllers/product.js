import Product from "../models/product";
import { ExamsSchame } from '../schema/validate'

export const getAllProduct = async (req, res) => {
    try {
        const getAll = await Product.find()
        res.json(getAll);
    } catch (error) {
        res.status(400).json({
            message: "fix",
        });
    }
}
export const getIdProduct = async (req, res) => {
    try {
        const getId = await Product.findById(req.params.id, req.body)
        res.json(getId)
    } catch (error) {
        res.status(400).json({
            message: "fix"
        })
    }
}
export const postProduct = async (req, res) => {
    try {
        const { error } = ExamsSchame.validate(req.body, { abortEarly: false })
        if (error) {
            const messages = error.details.map(({ message }) => message)
            return res.status(400).json({
                messages
            })
        }
        const msg = await Exams.create(req.body)
        res.json(msg)
    } catch (error) {
        res.status(400).json({
            message: "fix"
        })
    }
}
export const putProduct = async (req, res) => {
    try {
        const { error } = ExamsSchame.validate(req.body, { abortEarly: false })
        if (error) {
            const messages = error.details.map(({ message }) => message)
            return res.status(400).json({
                messages
            })
        }
        const msg = await Exams.findByIdAndUpdate(req.params.id, req.body)
        res.json(msg)
    } catch (error) {
        res.status(400).json({
            message: "fix"
        })
    }
}
export const delIdProduct = async (req, res) => {
    try {
        const del = await Product.findByIdAndDelete(req.params.id);
        res.json(del);
    } catch (error) {
        res.status(400).json({
            message: "fix",
        });
    }
};