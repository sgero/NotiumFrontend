import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {AdminPanelComponent} from "../admin-panel/admin-panel.component";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    AdminPanelComponent,
    IonicModule
  ],
  standalone: true
})
export class HeaderComponent  implements OnInit {

  constructor(private router: Router, public authService: AuthService) { }

  onToggleButtonClick() {

  }

  onRegisterButtonClick() {

    this.router.navigate(['/notium/registrar']);

  }

  onLoginButtonClick() {

    this.router.navigate(['/notium/login']);


  }
  ngOnInit() {return null}


  get isAdmin() {
    return this.authService.getUserRole() === 'ADMIN';
  }

  get isClient() {
    return this.authService.getUserRole() === 'CLIENTE';
  }

  get isRestaurant() {
    return this.authService.getUserRole() === 'RESTAURANTE';
  }

  get isOcioNocturno() {
    return this.authService.getUserRole() === 'OCIONOCTURNO';
  }

  get isRpp() {
    return this.authService.getUserRole() === 'RPP';
  }

  logout() {
    this.authService.logout();
    // Redirigir al usuario a la página de inicio de sesión u otra página, si es necesario
    this.router.navigate(['/login']).then(r => console.log('Logged out'));
  }

  openAdminPanel() {
    this.router.navigate(['/admin-panel']);
  }

  openClientPanel() {
    this.router.navigate(['/client-panel']);
  }

  openRestaurantPanel() {
    this.router.navigate(['/restaurant-panel']);
  }

  openOcioNocturnoPanel() {
    this.router.navigate(['/ocio-panel']);
  }

  openRppPanel() {
    this.router.navigate(['/rpp-panel']);
  }
}
