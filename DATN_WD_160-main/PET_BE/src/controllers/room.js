import { StatusCodes } from "http-status-codes"
import Room from "../models/room"



export const getAllRoom =  async (req,res)=>{
    try {
        const getAllRoom = await Room.find().populate("category")
        res.json(getAllRoom)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message:"fix"
        })
    }
}

export  const getIdRoom = async (req,res)=>{
    try {
        const getIdRoom = await Room.findById(req.params.id, req.body).populate("category")
        res.json(getIdRoom)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message:"fix"
        })
    }
}

export const postRoom = async (req,res)=> {
    try {
        const room = await Room.create(req.body);
        return res.status(StatusCodes.CREATED).json(room)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}

export const putRoom = async (req,res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body)
        res.json(room)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message:"fix"
        })
    }
}

export const delRoom = async (req,res) => {
    try {
        const del = await Room.findByIdAndDelete(req.params.id)
        res.json(del)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message:"fix"
        })
    }
}