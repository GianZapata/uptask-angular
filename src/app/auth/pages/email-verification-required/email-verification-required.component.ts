import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-email-verification-required',
  templateUrl: './email-verification-required.component.html',
  styles: [],
})
export class EmailVerificationRequiredComponent {
  public isEmailSended = false;

  constructor(private readonly authService: AuthService) {}

  onResendEmail() {
    // this.authService.sendEmailVerification();
    this.isEmailSended = true;
  }
}
