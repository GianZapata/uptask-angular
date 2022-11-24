import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateTokenGuard } from './guards/validate-token.guard';

import { EmailVerificationRequiredComponent } from './pages/email-verification-required/email-verification-required.component';
import { LoginComponent } from './pages/login/login.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SignupComponent } from './pages/signup/signup.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      {
        path: 'recover-password',
        children: [
          { path: '', component: RecoverPasswordComponent },
          {
            path: ':token',
            component: ResetPasswordComponent,
          },
        ],
      },
      { path: 'verify-email/:token', component: VerifyEmailComponent },
      {
        path: 'email-verification-required',
        component: EmailVerificationRequiredComponent,
        canActivate: [ValidateTokenGuard],
        canLoad: [ValidateTokenGuard],
      },
      { path: '**', redirectTo: 'login' },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
