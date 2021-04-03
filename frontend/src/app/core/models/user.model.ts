import { UserTypeEnum } from './userType.enum'

export class User {
    public _id: string;
    public resourceType: string;
    public username: string;
    public password: string;
    public firstname: string;
    public lastname: string;
    public email: string;
    public phone: string;
    public type: UserTypeEnum;
}