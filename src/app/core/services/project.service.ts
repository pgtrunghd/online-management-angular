import { environment } from 'environments/environment';
import { BaseService } from './base.service';
import {
  Project,
  ProjectData,
  ProjectPost,
} from '@core/interfaces/project.interface';
import { Observable, tap } from 'rxjs';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends BaseService {
  projects = signal<Project | null>(null);

  constructor() {
    super();
  }

  getProjects(params?: Record<string, any>): Observable<Project> {
    return this.withLoading(
      this.http.get<Project>(`${this.baseUrl}/project`, {
        params: this.filterObject(params!),
      })
    );
  }

  getProjectById(id: string) {
    return this.withLoading(
      this.http.get<ProjectData>(`${this.baseUrl}/project/${id}`)
    );
  }

  postProject(body: ProjectPost) {
    return this.withLoadingPost(
      this.http.post(`${this.baseUrl}/project`, this.filterObject(body)).pipe(
        tap(() => {
          this.refreshTrigger.update((v) => v + 1);
        })
      )
    );
  }

  putProject(id: string, body: ProjectPost) {
    return this.withLoadingPut(
      this.http
        .put(`${this.baseUrl}/project/${id}`, this.filterObject(body))
        .pipe(
          tap(() => {
            this.refreshTrigger.update((v) => v + 1);
          })
        )
    );
  }

  deleteProject(body: { ids: string[] }) {
    return this.withLoadingDelete(
      this.http
        .delete(`${this.baseUrl}/project`, {
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
