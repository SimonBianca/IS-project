import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserTypeEnum } from 'src/app/core/models/userType.enum';
import { APP_ROUTES } from 'src/app/core/routes/routes';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  constructor(
    public cartService: CartService,
    private router: Router,
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  get totalProducts() {
    let productQuantities: number[] = Object.values(this.cartService.cartProductsIds);
    let totalQuantity = 0;

    productQuantities.forEach(productQuantity => totalQuantity += productQuantity);

    return totalQuantity;
  }

  viewCart() {
    this.router.navigate([APP_ROUTES.CART.url]);
  }

  viewAccount() {
    this.router.navigate([APP_ROUTES.ACCOUNT.url]);
  }

  viewStore() {
    if (this.isClient) {
      this.router.navigate([APP_ROUTES.STORE.url]);
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate([APP_ROUTES.LOGIN.url]);
  }

  get isClient() {
    return localStorage.getItem("type") === UserTypeEnum.Client;
  }

}
