import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {IonicModule, ModalController} from "@ionic/angular";
import {AsyncPipe, NgIf} from "@angular/common";
import {LoginComponent} from "../login/login.component";


@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
  imports: [
    IonicModule,
    AsyncPipe,
    NgIf
  ],
  standalone: true
})
export class MenuLateralComponent  implements OnInit {



  @Input() userRole!: any;
  @Input() isLoggedIn!: any;


  constructor(private authService: AuthService,
              private modalController: ModalController) { }

  ngOnInit() {
    // this.isLoggedIn = this.authService.isUserLoggedIn();


    this.isLoggedIn = this.authService.isUserLoggedIn();


    this.userRole = this.authService.getUserRole();
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userRole = null;
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
}
