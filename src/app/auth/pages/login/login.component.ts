import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup = this.fb.group({
    email: ['gian@email.com', [Validators.required, Validators.email]],
    password: ['Abc123', [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  async onLogin() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe((res) => {
      if (res === true) {
        this.router.navigateByUrl('/projects');
        return;
      }
    });
  }
}
