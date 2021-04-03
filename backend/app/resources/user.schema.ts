import * as Mongoose from 'mongoose';
import {Schemas} from "./schemas";
import {UserTypeEnum} from "./userType.enum";

export var UserSchema: any = new Mongoose.Schema({
    resourceType: {
        type: String,
        default: Schemas.User
    },

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    type: {
        type: String,
        enum: Object.values(UserTypeEnum),
        default : UserTypeEnum.Client
    }
});

const UserModel = Mongoose.model(Schemas.User, UserSchema);
export default UserModel;
