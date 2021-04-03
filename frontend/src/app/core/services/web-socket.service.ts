import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: any;
  readonly url: string = "ws://localhost:3000";

  constructor() { 
    this.socket = (<any>io)(this.url);
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      })
    })
  }
}
