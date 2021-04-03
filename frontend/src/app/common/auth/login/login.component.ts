import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserTypeEnum } from 'src/app/core/models/userType.enum';
import { APP_ROUTES } from 'src/app/core/routes/routes';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public usernameModel: string;
  public passwordModel: string;

  public loginErrorMessage: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  public async createAccount() {
    this.router.navigate([APP_ROUTES.CREATE_ACCOUNT.url]);
  }

  public async login() {
    try {
      let user = await this.authenticationService.login(this.usernameModel, this.passwordModel);
      if(user !== undefined) {
        if(user.type === UserTypeEnum.Administrator) {
          this.router.navigate([APP_ROUTES.ADMIN.url]);
        } else {
          this.router.navigate([APP_ROUTES.STORE.url]);
        }

      }
    } catch (err: any) {
      this.loginErrorMessage = err.error;
    }
  }
}
