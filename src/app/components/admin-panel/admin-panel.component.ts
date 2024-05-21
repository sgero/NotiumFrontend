import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})
export class AdminPanelComponent {
  isAdminPanelOpen = false;
  adminOptions: string[] = [];

  constructor(private authService: AuthService) {
    this.setAdminOptions();
  }

  toggleAdminPanel() {
    this.isAdminPanelOpen = !this.isAdminPanelOpen;
  }

  setAdminOptions() {
    const role = this.authService.getUserRole();
    if (role === 'admin') {
      this.adminOptions = ['Option 1', 'Option 2', 'Option 3'];
    } else if (role === 'user') {
      this.adminOptions = ['Option 1', 'Option 2'];
    }
  }
}
