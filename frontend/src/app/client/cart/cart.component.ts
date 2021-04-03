import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/core/models/cartProduct.model';
import { Product } from 'src/app/core/models/product.model';
import { APP_ROUTES, storeProductUrl } from 'src/app/core/routes/routes';
import { CartService } from 'src/app/core/services/cart.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products: CartProduct[] = [];
  public totalPrice: number = 0;

  constructor(
    public cartService: CartService,
    public orderService: OrderService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.products = await this.cartService.getCartProducts();
    this.calculateTotalPrice();
  }

  viewProduct(product: Product) {
    this.router.navigate([storeProductUrl(product._id)]);
  }

  async finishOrder() {
    let userId = localStorage.getItem('id');
    await this.orderService.finishOrder(userId, this.cartService.cartProductsIds);
    this.cartService.resetCart();
    await this.router.navigate([APP_ROUTES.STORE.url]);
  }
  
  calculateTotalPrice() {
    this.totalPrice = 0;
    this.products.forEach(product => this.totalPrice += product.price * product.quantity);
  }

  async removeItem(id: string) {
    if (this.cartService.cartProductsIds[id] === 1)
      delete this.cartService.cartProductsIds[id];
    else 
      this.cartService.cartProductsIds[id]--;

    await this.ngOnInit();
  }
}
