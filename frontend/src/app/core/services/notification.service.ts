import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public subject: Subject<any> = new Subject();
  
  constructor() { }

  public notify(title: string, message: string) {
    this.subject.next({title: title, message: message});
  }
}
