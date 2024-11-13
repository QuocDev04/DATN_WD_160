
export interface IRoom {
    _id: string,
    roomName: string,
    roomprice: number,
    roomdescription: string,
    roomgallely: string[],
    status:string,
}

export interface AddIRoom {
    roomName: string,
    roomprice: number,
    roomdescription: string,
    roomgallely: string[],
    status: string,

}   
