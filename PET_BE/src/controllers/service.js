import { StatusCodes } from "http-status-codes";
import Services from "../models/services";

export const getAllService = async (req,res) => {
    try {
        const getAll = await Services.find()
        res.jons(getAll)
      } catch (error) {
        res.status(StatusCodes.BAD_REQUEST),json({
            message:"fix"
        })    
    }
}
export const getAIDService = async (req,res) => {
    try {
        const getId = await Services.findById(req.params.id, req.body)
        res.jons(getId)
      } catch (error) {
        res.status(StatusCodes.BAD_REQUEST),json({
            message:"fix"
        })    
    }
}
export const postService = async (req,res) => {
    try {
        const services = await Services.create(req.body);
        return res.status(StatusCodes.CREATED).json(services)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}
export const PutService = async (req,res) => {
    try {
        const services = await Services.findByIdAndUpdate(req.params.id, req.body)
        res.json(services)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message:"fix"
        })
    }
}
export const delIdService = async (req, res) => {
    try {
        const del = await Product.findByIdAndDelete(req.params.id);
        res.json(del);
    } catch (error) {
        res.status(400).json({
            message: "fix",
        });
    }
};