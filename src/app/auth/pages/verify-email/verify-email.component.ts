import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
})
export class VerifyEmailComponent implements OnInit {
  public isConfirmed = false;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.authService;
  }
}
