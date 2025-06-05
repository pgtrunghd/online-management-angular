import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  baseUrl = 'http://183.81.32.36:6110';
  http = inject(HttpClient);
  loading = signal(false);
  loadingPost = signal(false);
  loadingPut = signal(false);
  loadingDelete = signal(false);
  success = signal(false);
  refreshTrigger = signal(0);

  withLoading<T>(observable: Observable<T>) {
    this.loading.set(true);
    return observable.pipe(finalize(() => this.loading.set(false)));
  }

  withLoadingPost<T>(observable: Observable<T>) {
    this.loadingPost.set(true);
    return observable.pipe(finalize(() => this.loadingPost.set(false)));
  }

  withLoadingPut<T>(observable: Observable<T>) {
    this.loadingPut.set(true);
    return observable.pipe(finalize(() => this.loadingPut.set(false)));
  }

  withLoadingDelete<T>(observable: Observable<T>) {
    this.loadingDelete.set(true);
    return observable.pipe(finalize(() => this.loadingDelete.set(false)));
  }

  filterObject(params: Record<string, any>) {
    const result: Record<string, any> = {};
    for (let key in params) {
      if (!params[key]) {
        continue;
      } else {
        result[key] = params[key];
      }
    }
    return result;
  }
}
