import { MyStatus } from "./status.model";

export interface MyFormResponse<T>
{
    data: T;
    status : MyStatus;
}