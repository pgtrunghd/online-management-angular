import { environment } from 'environments/environment';
import { BaseService } from './base.service';
import { effect, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  Task,
  TaskData,
  TaskPost,
  TaskStatus,
} from '@core/interfaces/task.interface';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends BaseService {
  tasks = signal<Task | null>(null);
  route = inject(ActivatedRoute);

  constructor() {
    super();
    this.baseUrl = environment?.apiUrl;

    // effect(() => {
    //   this.refreshTrigger();

    //   this.getTasks({
    //     type:
    //       this.route.routeConfig?.path === 'all'
    //         ? ''
    //         : this.route.routeConfig?.path,
    //   }).subscribe((res) => {
    //     this.tasks.set(res);
    //   });
    // });
  }

  getTasks(params?: Record<string, any>): Observable<Task> {
    return this.withLoading(
      this.http.get<Task>(`${this.baseUrl}/task`, {
        params: this.filterObject(params!),
      })
    );
  }

  getTaskById(id: string) {
    return this.withLoading(
      this.http.get<TaskData>(`${this.baseUrl}/task/${id}`)
    );
  }

  getTaskStatus() {
    return this.http.get<TaskStatus[]>(`${this.baseUrl}/task/status`);
  }

  putTask(id: string, body: TaskPost) {
    return this.withLoadingPut(
      this.http.put(`${this.baseUrl}/task/${id}`, this.filterObject(body)).pipe(
        tap(() => {
          this.refreshTrigger.update((v) => v + 1);
        })
      )
    );
  }

  postTask(body: TaskPost) {
    return this.withLoadingPost(
      this.http.post(`${this.baseUrl}/task`, this.filterObject(body)).pipe(
        tap(() => {
          this.refreshTrigger.update((v) => v + 1);
        })
      )
    );
  }

  deleteTask(body: { ids: string[] }) {
    return this.withLoadingDelete(
      this.http
        .delete(`${this.baseUrl}/task`, {
          body: body,
        })
        .pipe(
          tap(() => {
            this.refreshTrigger.update((v) => v + 1);
          })
        )
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class TaskOptionsService extends BaseService {
  constructor() {
    super();
    this.baseUrl = environment?.apiUrl;
  }

  getTaskOptions(params?: Record<string, any>): Observable<Task> {
    this.loading.set(true);
    return this.http.get<Task>(`${this.baseUrl}/task`, {
      params: this.filterObject(params!),
    });
  }
}
