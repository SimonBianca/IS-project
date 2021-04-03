import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { ProductCategoryEnum } from 'src/app/core/models/productCategory.enum';
import { APP_ROUTES } from 'src/app/core/routes/routes';
import { StoreService } from 'src/app/core/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public categories: ProductCategoryEnum[] = [];

  constructor(
    private storeService: StoreService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.products = await this.storeService.getAllProducts();
    this.categories = this.storeService.getAllCategoryies();
  }

  async updateAvailability(product: Product) {
    product.isAvailable = !product.isAvailable;
    await this.storeService.updateProduct(product);
  }

  async updateProduct(product: Product) {
    await this.storeService.updateProduct(product);
  }

  async deleteProduct(product: Product) {
    await this.storeService.deleteProduct(product);
    await this.ngOnInit();
  }

  async addNewProducts() {
    await this.router.navigate([APP_ROUTES.ADMIN.CREATE_PRODUCT.url()]);
  }
}
