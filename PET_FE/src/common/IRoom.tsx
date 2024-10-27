export interface IRoom {
    _id: string,
    productName: string,
    price: number,
    description: string,
    gallery: string[];
}

export interface AddIRoom {
    productName: string,
    price: number,
    description: string,
    gallery: string[];
}   
