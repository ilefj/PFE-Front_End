import { ResponseCode } from "../Enums/ResponseCode";

export class ResponseModel{
    public responseCode : ResponseCode = ResponseCode.NotSet;
    public responseMessage : string ="";
    public dateSet : any ;
}