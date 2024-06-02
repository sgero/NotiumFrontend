import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {AdminPanelComponent} from "../admin-panel/admin-panel.component";
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "../login/login.component";
import {RegistroComponent} from "../registro/registro.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    AdminPanelComponent,
    IonicModule,
    CommonModule
  ],
  standalone: true
})
export class HeaderComponent  implements OnInit {

  protected username: string | undefined;

  constructor(private router: Router, public authService: AuthService,
              private modalController: ModalController) { }

  onRegisterButtonClick() {

    this.router.navigate(['/notium/registrar']);

  }

  onLoginButtonClick() {

    this.router.navigate(['/notium/login']);


  }
  // ngOnInit() {return null}


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


  async login() {
    const modal = await this.modalController.create({
      component: LoginComponent, // Reemplaza LoginComponent por el nombre de tu componente de inicio de sesión
      componentProps: {
        // Puedes pasar cualquier dato necesario al modal
      }
    });
    await modal.present();
  }


  async registro() {
    const modal = await this.modalController.create({
      component: RegistroComponent, // Reemplaza LoginComponent por el nombre de tu componente de inicio de sesión
      componentProps: {
        // Puedes pasar cualquier dato necesario al modal
      }
    });
    await modal.present();
  }


  ngOnInit() {
    this.authService.getCurrentUser().subscribe(usuario => {
      // @ts-ignore
      this.username = usuario.username; // Suponiendo que el servicio devuelve el nombre de usuario
    });
  }

  }
