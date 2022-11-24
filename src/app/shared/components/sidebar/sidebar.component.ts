import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {
  private _user = this.authService.user;

  get user() {
    return { ...this._user };
  }

  constructor(private readonly authService: AuthService) {}
}
