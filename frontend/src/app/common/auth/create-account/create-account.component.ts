import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from 'src/app/core/routes/routes';
import { CreateAccountService } from 'src/app/core/services/createAccount.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  public usernameModel: string;
  public passwordModel: string;
  public firstNameModel: string;
  public lastNameModel: string;
  public emailModel: string;
  public phoneModel: string;

  public createAccountErrorMessage: string;

  constructor(
    private router: Router,
    private createAccountService: CreateAccountService
  ){}

  public async createAccount() {
    try {
      await this.createAccountService.createAccount(this.usernameModel, this.passwordModel, this.firstNameModel, this.lastNameModel, this.emailModel, this.phoneModel);
      this.router.navigate([APP_ROUTES.LOGIN.url]);
    } catch (err: any) {
      this.createAccountErrorMessage = err.error;
    }
  }
}
