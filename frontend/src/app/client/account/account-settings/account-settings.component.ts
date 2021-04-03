import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  public user: User;

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.user = await this.userService.getById(localStorage.getItem('id'));
  }

  updateAccount() {
    this.userService.updateAccount(this.user);
  }
  

}
