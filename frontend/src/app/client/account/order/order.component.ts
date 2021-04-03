import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/core/models/order.model';
import { Product } from 'src/app/core/models/product.model';
import { APP_ROUTES } from 'src/app/core/routes/routes';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public orders: Order[] = [];
  constructor(
    public orderService: OrderService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.orders = await this.orderService.getAllUserOrders(localStorage.getItem('id'));
  }

  async viewProduct(product: Product) {
    await this.router.navigate([APP_ROUTES.STORE.PRODUCT.url(product._id)]);
  }

}
