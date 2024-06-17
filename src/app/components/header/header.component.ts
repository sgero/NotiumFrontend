import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {AdminPanelComponent} from "../admin-panel/admin-panel.component";
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "../login/login.component";
import {RegistroComponent} from "../registro/registro.component";
import {UsuarioService} from "../../services/usuario.service";
import {MenuLateralComponent} from "../menu-lateral/menu-lateral.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    AdminPanelComponent,
    IonicModule,
    CommonModule,
    MenuLateralComponent
  ],
  standalone: true
})
export class HeaderComponent  implements OnInit {

  username: any;
  usuarioLogueado:any;

  constructor(private router: Router,
              public authService: AuthService,
              private modalController: ModalController,
              private userService: UsuarioService) { }

  ngOnInit() {

    if (localStorage.getItem('token')){
      this.traerUsuario();
    }

  }

  traerUsuario(){

    this.userService.getUsuarioToken().subscribe(data=>{

      this.usuarioLogueado = data;
      this.username = this.usuarioLogueado.username;
      localStorage.setItem('username', this.username);

    }, error => {

    });

  }

  logout() {

    this.authService.logout();
    this.router.navigate(['/notium']).then(r => console.log('Logged out'));

  }

  async login() {
    const modal = await this.modalController.create({
      component: LoginComponent,
      componentProps: {
      }
    });
    await modal.present();
  }

  async registro() {
    const modal = await this.modalController.create({
      component: RegistroComponent,
      componentProps: {
      }
    });
    await modal.present();
  }

}
