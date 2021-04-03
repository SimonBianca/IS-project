import {ProductCategoryEnum} from "./productCategory.enum";

export class Product {
    public _id: string;
    public img:  string | ArrayBuffer | null;
    public name: string;
    public description: string;
    public price: number;
    public isAvailable: boolean;
    public category: ProductCategoryEnum;

    constructor() {
        this.img = null;
        this.name = '';
        this.description = '';
        this.price = 0;
        this.isAvailable = false;
        this.category = ProductCategoryEnum.Others;
    }
}
