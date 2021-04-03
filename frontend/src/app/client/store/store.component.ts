import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { storeProductUrl } from 'src/app/core/routes/routes';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  public products: Product[] = [];
  public categories: string[] = [];

  constructor(
    public storeService: StoreService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.products = await this.storeService.getAllProducts();
    this.categories = await this.storeService.getAllCategoryies();
  }

  async getProductsByCategory(category: string) {
    this.products = await this.storeService.getProductsByCategory(category);
  }

  async getAllProducts(){
    this.products = await this.storeService.getAllProducts();
  }

  viewProduct(product: Product) {
    this.router.navigate([storeProductUrl(product._id)]);
  }
}
