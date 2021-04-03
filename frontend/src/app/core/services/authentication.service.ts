import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrl, API_ROUTES } from '../routes/api.routes';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(private http: HttpClient) {
    }

    async login(username, pass) {
        const response: any = await this.http.post(ApiUrl(API_ROUTES.LOGIN_URL), { username: username, password: pass }).toPromise();

        let token = response.token;
        let user: User = response.user;
        if (token !== undefined) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', token);
            localStorage.setItem('id', user._id);
            localStorage.setItem('type', user.type);
            return user;
        }

        throw response.message;
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('token');
        localStorage.removeItem('id');
    }

    isUserLoggedIn() {
        return !!localStorage.getItem('token');
    }
}