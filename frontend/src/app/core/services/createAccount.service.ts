import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrl, API_ROUTES } from '../routes/api.routes';

@Injectable({ providedIn: 'root' })
export class CreateAccountService {

    constructor(private http: HttpClient) {
    }

    async createAccount(user, pass, firstname, lastname, email, phone) {
        return await this.http.post(ApiUrl(API_ROUTES.CLIENT_CREATE_URL), { username: user, password: pass, firstname: firstname, lastname: lastname,  email: email, phone: phone}).toPromise();
    }
}