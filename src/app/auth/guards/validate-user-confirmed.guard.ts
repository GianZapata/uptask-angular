import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ValidateUserConfirmedGuard implements CanActivate, CanLoad {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.validateUserConfirmed().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/auth/email-verification-required');
        }
      }),
    );
  }
  canLoad():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.validateUserConfirmed().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/auth/email-verification-required');
        }
      }),
    );
  }
}
