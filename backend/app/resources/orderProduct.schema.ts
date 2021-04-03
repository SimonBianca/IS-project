import * as Mongoose from 'mongoose';
import { Schemas } from "./schemas";

export var OrderProductSchema: any = new Mongoose.Schema({
    resourceType: {
        type: String,
        default: Schemas.OrderProduct
    },
    productId: [
        { type: Mongoose.Schema.Types.ObjectId, ref: Schemas.Product }
    ],
    orderId: [
        { type: Mongoose.Schema.Types.ObjectId, ref: Schemas.Order }
    ],
    quantity: {
        type: Number,
        default: 0
    }
});

const UserModel = Mongoose.model(Schemas.OrderProduct, OrderProductSchema);
export default UserModel
