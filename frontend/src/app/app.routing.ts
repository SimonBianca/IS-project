import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CreateProductComponent } from './admin/products/create-product/create-product.component';
import { AppComponent } from './app.component';
import { AccountComponent } from './client/account/account.component';
import { CartComponent } from './client/cart/cart.component';
import { StoreProductComponent } from './client/store/store-product/store-product.component';
import { StoreComponent } from './client/store/store.component';
import { CreateAccountComponent } from './common/auth/create-account/create-account.component';
import { LoginComponent } from './common/auth/login/login.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { APP_ROUTES } from './core/routes/routes';

const routes: Routes = [
    { path: '', component: AppComponent, canActivate: [AuthGuard] },
    { path: APP_ROUTES.LOGIN.path, component: LoginComponent },
    { path: APP_ROUTES.CREATE_ACCOUNT.path, component: CreateAccountComponent },
    { path: APP_ROUTES.STORE.path, component: StoreComponent, canActivate: [AuthGuard] },
    { path: APP_ROUTES.STORE.PRODUCT.path, component: StoreProductComponent, canActivate: [AuthGuard] },
    { path: APP_ROUTES.CART.path, component: CartComponent, canActivate: [AuthGuard] },
    { path: APP_ROUTES.ACCOUNT.path, component: AccountComponent, canActivate: [AuthGuard] },
    { path: APP_ROUTES.ADMIN.path, component: AdminComponent, canActivate: [AdminGuard, AuthGuard] },
    { path: APP_ROUTES.ADMIN.CREATE_PRODUCT.path, component: CreateProductComponent, canActivate: [AdminGuard, AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: APP_ROUTES.STORE.path }
];

export const appRoutingModule = RouterModule.forRoot(routes);