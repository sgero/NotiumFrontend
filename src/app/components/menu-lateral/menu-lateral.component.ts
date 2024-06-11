import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {IonicModule, ModalController} from "@ionic/angular";
import {AsyncPipe, NgIf} from "@angular/common";
import {LoginComponent} from "../login/login.component";
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";
// @ts-ignore
import {EditarPerfilComponent} from "../perfil/editar-perfil/editar-perfil.component";


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
export class MenuLateralComponent implements OnInit {


  @Input() userRole!: any;
  @Input() isLoggedIn!: any;

  usuarioLogueado:any;
  username:any;


  constructor(private authService: AuthService,
              private modalController: ModalController,
              private userService: UsuarioService,
              private router: Router) {
  }

  ngOnInit() {

    if (localStorage.getItem('token')){
      this.traerUsuario();
    }
    this.isLoggedIn = this.authService.isUserLoggedIn()

  }

  traerUsuario() {

    this.userService.getUsuarioToken().subscribe(data => {

      this.usuarioLogueado = data;
      this.username = this.usuarioLogueado.username;
      this.userRole = this.usuarioLogueado.rol;
      localStorage.setItem('username', this.username);

    }, error => {

    });

  }

  visualizarPerfil(){

    this.router.navigate(['/notium/perfil']);

  }

  async editarPerfil(){

    const modal = await this.modalController.create({
      component: EditarPerfilComponent,
      componentProps: {
      }
    });
    await modal.present();

  }


  verTicketsReservas(){

    this.router.navigate(['/notium/ticketsyreservas']);

  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userRole = null;
  }


  async login() {
    const modal = await this.modalController.create({
      component: LoginComponent,
      componentProps: {
      }
    });
    await modal.present();
  }
}
