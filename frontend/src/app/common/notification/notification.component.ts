import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import {Notification} from './notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  public notifications: Notification[] = [];

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.notificationService.subject.subscribe((notification: Notification) => {
      this.notifications.push(notification);
    })
  }

  public deleteNotification(notification: Notification) {
    this.notifications = this.notifications.filter((n: Notification) => {
      return n.title !== notification.title && n.message !== notification.message;
    });
  }

}
