import { environment } from 'environments/environment';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { User } from '@core/interfaces/user.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor() {
    super();
    this.baseUrl = environment?.apiUrl;
  }

  getPublicInfo(params?: Record<string, any>): Observable<User> {
    return this.withLoading(
      this.http.get<User>(`${this.baseUrl}/user/public-info`, {
        params: this.filterObject(params!),
      })
    );
  }
}
