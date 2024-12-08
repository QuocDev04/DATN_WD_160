
export interface IProduct {
    _id: string,
    productName: string,
    price: number,
    description: string,
    gallery: string[];
    categoryproduct:string
}

export interface AddIProduct {
    productName: string,
    price: number,
    description: string,
    gallery: string[];
    categoryproduct:string

}   
