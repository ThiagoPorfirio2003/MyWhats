import { MyMessage } from "./message.model";

export interface MyOutPutData<T>
{
    data: T;
    dataIsValid : boolean;
    message : MyMessage;
}