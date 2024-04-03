import { Image } from "./image.model";

export interface UserModel
{
    email : string;
    realName : string;
    surname : string;
    userName : string;
    uid : string;
    image : Image;
}

export interface UserAccessData
{
    email : string;
    password : string;
    isLogin : boolean;
}

export interface UserPersonalData
{
    realName : string;
    surname : string;
    userName : string;
    image : Image;
}