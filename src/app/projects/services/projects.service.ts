import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Project } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private baseUrl: string = environment.baseUrl;
  private token = localStorage.getItem('token') || '';
  private _project: Project | null = null;

  constructor(private readonly http: HttpClient) {}

  get project() {
    return { ...this._project };
  }

  getProject(id: string): Observable<Project> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<Project>(`${this.baseUrl}/projects/${id}`, {
      headers,
    });
  }

  getProjects(): Observable<Project[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<Project[]>(`${this.baseUrl}/projects`, { headers });
  }

  createProject(project: {
    name: string;
    description: string;
    client: string;
    deliveryDate: string;
  }): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .post<Project>(`${this.baseUrl}/projects`, project, { headers })
      .pipe(
        tap((res) => {
          if (res._id) this._project = res;
        }),
        map((res) => Boolean(res._id)),
        catchError(() => of(false)),
      );
  }

  updateProject(
    id: string,
    project: {
      name?: string;
      description?: string;
      client?: string;
      deliveryDate?: string;
    },
  ): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .patch<Project>(
        `${this.baseUrl}/projects/${id}`,
        { ...project, id },
        { headers },
      )
      .pipe(
        tap((res) => {
          if (res._id) this._project = res;
        }),
        map((res) => Boolean(res._id)),
        catchError(() => of(false)),
      );
  }

  deleteProject(id: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    return this.http.delete<Project>(`${this.baseUrl}/projects/${id}`, {
      headers,
    });
  }
}
