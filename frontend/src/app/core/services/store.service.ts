import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrl, API_ROUTES } from '../routes/api.routes';
import { Product } from '../models/product.model';
import { ProductCategoryEnum } from '../models/productCategory.enum';

@Injectable({ providedIn: 'root' })
export class StoreService {
    
    constructor(private http: HttpClient) { }

    getAllProducts() {
        return this.http.get<Product[]>(ApiUrl(API_ROUTES.RESOURCE_URL + API_ROUTES.PRODUCT_URL)).toPromise();
    }

    getAllCategoryies() {
        return Object.values(ProductCategoryEnum);
    }

    getProductsByCategory(category: string) {
        return this.http.get<Product[]>(ApiUrl(API_ROUTES.SPECIFIC_URL + API_ROUTES.PRODUCT_URL + '/' + category)).toPromise();
    }

    getProductsById(id: string) {
        return this.http.get<Product>(ApiUrl(API_ROUTES.RESOURCE_URL + API_ROUTES.PRODUCT_URL + '/' + id)).toPromise();
    }

    updateProduct(product: Product) {
        return this.http.put<Product>(ApiUrl(API_ROUTES.RESOURCE_URL + API_ROUTES.PRODUCT_URL + '/' + product._id), product).toPromise();
    }

    deleteProduct(product: Product) {
        return this.http.delete<Product[]>(ApiUrl(API_ROUTES.RESOURCE_URL + API_ROUTES.PRODUCT_URL + '/' + product._id)).toPromise();
    }

    createProduct(product: Product) {
        return this.http.post<Product>(ApiUrl(API_ROUTES.RESOURCE_URL + API_ROUTES.PRODUCT_URL), product).toPromise();   
      }
}