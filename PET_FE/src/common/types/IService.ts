export interface IService {
    _id: string,
    servicesName: string,
    price: number,
    description: string,
    gallery: string[];
}
export interface AddIService {
    servicesName: string,
    price: number,
    description: string,
    gallery: string[];
}   
