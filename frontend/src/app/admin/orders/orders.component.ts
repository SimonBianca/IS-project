import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Order } from 'src/app/core/models/Order.model';
import { OrderStatusEnum } from 'src/app/core/models/orderStatus.enum';
import { OrderService } from 'src/app/core/services/order.service';
import { WebSocketService } from 'src/app/core/services/web-socket.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public orders: Order[] = [];
  public orderStatus: OrderStatusEnum[] = [];

  constructor(
    private orderService: OrderService,
    private webSocketService: WebSocketService,
    public fb: FormBuilder
  ) { }

  async ngOnInit() {
    this.orders = await this.orderService.getAllOrders();
    this.orderStatus = this.orderService.getAllOrdersStatus();
    
    this.webSocketService.listen('order event')
      .subscribe(async () => {
        this.orders = await this.orderService.getAllOrders();
      })
  }

  async updateOrderStatus(order: Order) {
    await this.orderService.updateOrderStatus(order);
  }

}
