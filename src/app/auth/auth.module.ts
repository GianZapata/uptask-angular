import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './services/auth.service';
import { AuthRoutingModule } from './auth-routing.module';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { EmailVerificationRequiredComponent } from './pages/email-verification-required/email-verification-required.component';
import { LoginComponent } from './pages/login/login.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SignupComponent } from './pages/signup/signup.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';


@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginComponent,
    RecoverPasswordComponent,
    ResetPasswordComponent,
    SignupComponent,
    VerifyEmailComponent,
    EmailVerificationRequiredComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
})
export class AuthModule { }
