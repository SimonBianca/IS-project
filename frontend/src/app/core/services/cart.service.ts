import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartProduct } from '../models/cartProduct.model';
import { Product } from '../models/product.model';
import { ApiUrl, API_ROUTES } from '../routes/api.routes';

@Injectable({ providedIn: 'root' })
export class CartService {
    public cartProductsIds: any = {};

    constructor(
        private http: HttpClient
    ) { }

    addToCart(id: string) {
        if (this.cartProductsIds[id])
            this.cartProductsIds[id]++;
        else 
            this.cartProductsIds[id] = 1;
    }

    async getCartProducts() {
        let products: Product[] = await this.http.post<Product[]>(ApiUrl(API_ROUTES.RESOURCE_URL + API_ROUTES.PRODUCT_URL + '/ids'), {
            ids: Object.keys(this.cartProductsIds)
        }).toPromise();

        let cartProducts: CartProduct[] = [];
        products.forEach(product => {
            let cartProduct = <CartProduct>product;
            cartProduct.quantity = this.cartProductsIds[product._id];
            cartProducts.push(cartProduct);
        });

        return cartProducts;
    }

    resetCart() {
        this.cartProductsIds = {};
      }
}