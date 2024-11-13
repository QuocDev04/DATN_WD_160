import { ICategory } from "./ICategory";

export interface IRoom {
    _id: string,
    roomName: string,
    roomprice: number,
    roomdescription: string,
    roomgallely: string[],
    status:string,
    category: ICategory[]
}

export interface AddIRoom {
    roomName: string,
    roomprice: number,
    roomdescription: string,
    roomgallely: string[],
    status: string,
    category: ICategory[]

}   
