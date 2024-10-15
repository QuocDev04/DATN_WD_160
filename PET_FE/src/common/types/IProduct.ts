
export interface IProduct {
    _id: string,
    name: string,
    price: number,
    description: string,
    gallery: string[];
}

export interface AddIProduct {
    name: string,
    price: number,
    description: string,
    gallery: string[];
}   
