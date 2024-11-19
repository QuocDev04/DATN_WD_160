export interface IService {
    _id: string,
    servicesName: string,
    priceService: number,
    descriptionService: string,
    galleryService: string[];
}
export interface AddIService {
    servicesName: string,
    priceService: number,
    descriptionService: string,
    galleryService: string[];
}   
