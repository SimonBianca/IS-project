import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/services/interceptors/token.interceptor';
import { AdminComponent } from './admin/admin.component';
import { ProductsComponent } from './admin/products/products.component';
import { UsersComponent } from './admin/users/users.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { AccountComponent } from './client/account/account.component';
import { AccountSettingsComponent } from './client/account/account-settings/account-settings.component';
import { CartComponent } from './client/cart/cart.component';
import { AppHeaderComponent } from './common/app-header/app-header.component';
import { StoreProductComponent } from './client/store/store-product/store-product.component';
import { StoreComponent } from './client/store/store.component';
import { CreateAccountComponent } from './common/auth/create-account/create-account.component';
import { LoginComponent } from './common/auth/login/login.component';
import { OrderComponent } from './client/account/order/order.component';
import { CreateProductComponent } from './admin/products/create-product/create-product.component';
import { NotificationComponent } from './common/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    StoreComponent,
    StoreProductComponent,
    AppHeaderComponent,
    CartComponent,
    AccountSettingsComponent,
    AccountComponent,
    OrderComponent,

    AdminComponent,
    OrdersComponent,
    ProductsComponent,
    UsersComponent,
    CreateProductComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    appRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
