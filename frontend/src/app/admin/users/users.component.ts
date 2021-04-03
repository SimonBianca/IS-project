import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: User[] = [];
  constructor(
    private userService: UserService
  ) { }

  async ngOnInit(){
    this.users = await this.userService.getAllUsers();
  }
  async updateUser(user: User) {
    await this.userService.updateAccount(user);
  }

  async deleteUser(user: User) {
    await this.userService.deleteUser(user);
    await this.ngOnInit();
  }
}
