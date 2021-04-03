import * as Mongoose from 'mongoose';
import { OrderStatusEnum } from './orderStatus.enum';
import {Schemas} from "./schemas";

export var OrderSchema: any = new Mongoose.Schema({
    resourceType: {
        type: String,
        default: Schemas.Order
    },

    userId: { 
        type: Mongoose.Schema.Types.ObjectId,
        ref: Schemas.User
    },
    status: {
        type: String,
        enum: Object.values(OrderStatusEnum),
        default : OrderStatusEnum.InProgress
    },
    total: {
        type: Number,
        default: 0
    }
});

const OrderModel = Mongoose.model(Schemas.Order, OrderSchema);
export default OrderModel
