import * as Mongoose from 'mongoose';
import { Schemas } from "./schemas";
import { ProductCategoryEnum } from "./productCategory.enum";

export var ProductSchema: any = new Mongoose.Schema({
    resourceType: {
        type: String,
        default: Schemas.Product
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    price: Number,
    isAvailable: Boolean,
    category: {
        type: String,
        enum: Object.values(ProductCategoryEnum),
        default: ProductCategoryEnum.Others
    }, 
    img: String
});

const ProductModel = Mongoose.model(Schemas.Product, ProductSchema);
export default ProductModel
