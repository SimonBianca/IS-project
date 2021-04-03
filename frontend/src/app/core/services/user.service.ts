import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { ApiUrl, API_ROUTES } from '../routes/api.routes';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(
        private http: HttpClient
    ) { }
    
    getById(id: string) {
        return this.http.get<User>(ApiUrl(API_ROUTES.RESOURCE_URL + API_ROUTES.USER_URL + '/' + id)).toPromise();
    }

    updateAccount(user: User) {
        return this.http.put(ApiUrl(API_ROUTES.RESOURCE_URL + API_ROUTES.USER_URL + '/' + user._id), user).toPromise();
    }

    getAllUsers() {
        return this.http.get<User[]>(ApiUrl(API_ROUTES.RESOURCE_URL + API_ROUTES.USER_URL)).toPromise();
    }

    deleteUser(user: User) {
        return this.http.delete(ApiUrl(API_ROUTES.RESOURCE_URL + API_ROUTES.USER_URL + '/' + user._id)).toPromise();
    }
}