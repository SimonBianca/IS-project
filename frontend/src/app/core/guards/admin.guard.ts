import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserTypeEnum } from '../models/userType.enum';
import { APP_ROUTES } from '../routes/routes';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUserType = localStorage.getItem('type');
        if (currentUserType === UserTypeEnum.Administrator) {
            // is admin so return true
            return true;
        }

        // not admin in so redirect to login page
        this.router.navigate([APP_ROUTES.LOGIN.url]);
        return false;
    }
}