import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { ProductCategoryEnum } from 'src/app/core/models/productCategory.enum';
import { APP_ROUTES } from 'src/app/core/routes/routes';
import { StoreService } from 'src/app/core/services/store.service';
import { AdminTab } from '../../AdminTab.enum';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  public product: Product = new Product();
  public categories: ProductCategoryEnum[] = [];

  constructor(
    private storeService: StoreService,
    private router: Router
  ) { }

  ngOnInit() {
    this.categories = this.storeService.getAllCategoryies();
  }

  async addProduct() {
    if (this.isAddAvailable) {
      await this.storeService.createProduct(this.product);
      await this.router.navigate([APP_ROUTES.ADMIN.url, { tab: AdminTab.Products }]);
    }
  }

  get isAddAvailable() {
    return this.product.name !== '' && this.product.description !== '' && this.product.price !== 0 && this.product.img !== null;
  }

  async uploadFile(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    return await new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = (event) => {
        this.product.img = event.target.result;
        resolve(null);
      };
      reader.readAsDataURL(file);
    });
  }
}
