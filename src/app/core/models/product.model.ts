import { Image } from "./image.model";

export interface ProductDetailed
{
    uidPublisher : string;
    id : string;
    name : string;
    price : number;
    description : string;
    images : Array<Image>;
    stock : number;
    sales : number;
    stars : number;
}

export interface ProductWindow
{
    id : string;
    name : string;
    price : number;
    imageUrl : string;
}

export interface review
{
    id : string;
    uidPublisher : string;
    coment : string;
    stars : number;
}

export interface Ticket
{
    product : ProductWindow;
    uidSeller : string;
    saleDate : Date;
}

/*
    ProductoModel: id, precio, nombre, sinopsis, descripcion, img/s,{uid vendedor, userName}
*/
