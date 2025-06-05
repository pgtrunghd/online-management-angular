import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor() {
    super();
  }

  getAuthToken() {
    return JSON.parse(localStorage.getItem('token') as string);
  }

  getMe() {
    return JSON.parse(localStorage.getItem('user') as string);
  }

  login(credentials: { email: string; password: string }) {
    return this.withLoadingPost(
      this.http.post(`${this.baseUrl}/auth/login`, credentials)
    );
  }
}
