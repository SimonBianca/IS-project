
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const setAuthorizationToken = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    });
    return next.handle(setAuthorizationToken);
  }
}