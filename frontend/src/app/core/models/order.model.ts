import { OrderStatusEnum } from "./orderStatus.enum";
import { Product } from "./product.model";

export class Order {
    public _id: string;
    public status: OrderStatusEnum;
    public products: Product[];
    public username: string;
    public total: Number;
}