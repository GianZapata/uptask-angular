import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  constructor(private readonly http: HttpClient) {}

  get user() {
    return { ...this._user };
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((res) => {
        if (res.user) {
          localStorage.setItem('token', res.token);
          this._user;
        }
      }),
      map((res) => !!res.user),
      catchError((error) => of(error.error.message as string)),
    );
  }

  signup(signupInput: {
    name: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    const url = `${this.baseUrl}/auth/signup`;

    return this.http.post<AuthResponse>(url, signupInput).pipe(
      tap((resp) => {
        if (resp.user) {
          localStorage.setItem('token', resp.token);
          this._user = resp.user;
        }
      }),
      map((resp) => !!resp.user),
      catchError((error) => of(error.error.message as string)),
    );
  }

  logout() {
    localStorage.clear();
  }

  validateToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/revalidate`;
    const token = localStorage.getItem('token') || '';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map((res) => {
        this.setAuthResponse(res);
        return !!this._user;
      }),
      catchError(() => of(false)),
    );
  }

  validateUserConfirmed(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/revalidate`;
    const token = localStorage.getItem('token') || '';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map((res) => {
        this.setAuthResponse(res);
        return this._user.confirmed;
      }),
      catchError(() => of(false)),
    );
  }

  private setAuthResponse({ token, user }: AuthResponse) {
    this._user = user;
    localStorage.setItem('token', token);
  }
}
