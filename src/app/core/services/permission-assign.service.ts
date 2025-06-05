import { environment } from 'environments/environment';
import { BaseService } from './base.service';
import { User } from '@core/interfaces/user.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PermissionAssignService extends BaseService {
  constructor() {
    super();
  }

  getUser(params?: Record<string, any>): Observable<User> {
    this.loading.set(true);
    return this.http.get<User>(`${this.baseUrl}/permission-assign/user`, {
      params: this.filterObject(params!),
    });
  }
}
