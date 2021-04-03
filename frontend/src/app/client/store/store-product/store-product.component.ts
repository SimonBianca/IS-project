import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
  selector: 'app-store-product',
  templateUrl: './store-product.component.html',
  styleUrls: ['./store-product.component.css']
})
export class StoreProductComponent implements OnInit {
  public product: Product;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private cartService: CartService
  ) { }

  async ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id');
    this.product = await this.storeService.getProductsById(productId);
  }

  addToCart() {
    if (this.product.isAvailable) {
      this.cartService.addToCart(this.product._id);
    }
  }

}
