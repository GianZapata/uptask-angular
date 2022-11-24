import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  public errorMessage = '';
  public showErrorMessage = false;
  public isSending = false;
  public showSuccessMessage = false;

  signupForm: FormGroup = this.fb.group({
    name: ['Gian', [Validators.required, Validators.minLength(3)]],
    lastName: ['Zapata', [Validators.required, Validators.minLength(3)]],
    email: ['gian@email.com', [Validators.required, Validators.email]],
    password: [
      'Abc123',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/), // Example: Password1
      ],
    ],
    passwordConfirm: ['Abc123', [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  async onRegisterUser(): Promise<void> {
    const { passwordConfirm, email, lastName, name, password } =
      this.signupForm.value;

    this.isSending = true;

    this.errorMessage = '';
    this.showErrorMessage = false;

    if (passwordConfirm !== password) {
      this.errorMessage = 'Las contraseñas no coinciden';
      this.showErrorMessage = true;
      this.isSending = false;
      return;
    }

    this.authService
      .signup({ email, password, name, lastName })
      .subscribe((resp) => {
        if (resp === true) {
          this.showSuccessMessage = true;
          this.isSending = false;
          this.signupForm.reset();
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard');
          }, 3000);
          return;
        }

        this.errorMessage = resp.toString();
        this.showErrorMessage = true;
        this.isSending = false;
      });
  }
}
