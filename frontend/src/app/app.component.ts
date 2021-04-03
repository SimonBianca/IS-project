import { Component, OnInit } from '@angular/core';
import { Order } from './core/models/Order.model';
import { OrderStatusEnum } from './core/models/orderStatus.enum';
import { UserTypeEnum } from './core/models/userType.enum';
import { AuthenticationService } from './core/services/authentication.service';
import { NotificationService } from './core/services/notification.service';
import { WebSocketService } from './core/services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    public authentificationService: AuthenticationService,
    private webSocketService: WebSocketService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.webSocketService.listen('order event')
      .subscribe((order: Order) => {
        if (localStorage.getItem('type') === UserTypeEnum.Administrator && order.status !== OrderStatusEnum.InProgress) {
          return;
        }
        
        this.notificationService.notify("Order " + order._id, "Status: " + order.status);
      })
  }

  get isUserLoggedIn() {
    return this.authentificationService.isUserLoggedIn();
  }
}