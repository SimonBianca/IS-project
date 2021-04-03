import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrl, API_ROUTES } from '../routes/api.routes';
import { Order } from '../models/Order.model';
import { OrderStatusEnum } from '../models/orderStatus.enum';

@Injectable({ providedIn: 'root' })
export class OrderService {
    constructor(
        private http: HttpClient,
    ) { }

    async finishOrder(userId: string, cartProductIds: any[]) {
        return await this.http.post(ApiUrl(API_ROUTES.SPECIFIC_URL + API_ROUTES.ORDER_URL + '/create'), {
            userId: userId,
            productIdsQuantities: cartProductIds
        }).toPromise();

    }

    getAllUserOrders(userId: string) {
        return this.http.get<Order[]>(ApiUrl(API_ROUTES.SPECIFIC_URL + API_ROUTES.USER_ORDER_URL + '/' + userId)).toPromise();
    }

    getAllOrders() {
        return this.http.get<Order[]>(ApiUrl(API_ROUTES.SPECIFIC_URL + API_ROUTES.ADMIN_ORDERS_URL)).toPromise();
    }

    getAllOrdersStatus() {
        return Object.values(OrderStatusEnum);
    }

    async updateOrderStatus(order: Order) {
        return await this.http.put(ApiUrl(API_ROUTES.SPECIFIC_URL + API_ROUTES.ORDER_URL + '/' + order._id), order).toPromise();
    }
}