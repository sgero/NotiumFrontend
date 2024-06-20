import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {IonicModule, ModalController, ToastController} from "@ionic/angular";
import {UsuarioService} from "../../services/usuario.service";
import {Usuario} from "../../models/Usuario";
import {FormsModule} from "@angular/forms";
import {EditarPerfilComponent} from "./editar-perfil/editar-perfil.component";
import {Router} from "@angular/router";
import {CommonModule, NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [
    HeaderComponent,
    FooterComponent,
    IonicModule,
    FormsModule,
    CommonModule
  ],
  standalone: true
})
export class PerfilComponent  implements OnInit {

  usuario: Usuario = new Usuario();
  perfil:any;
  mensaje='';

  constructor(private usuarioService: UsuarioService,
              private modalController: ModalController,
              private router: Router,
              private toastController: ToastController,
              private authService: AuthService,) { }

  ngOnInit() {

    if (localStorage.getItem('token')){
      this.traerUser();
    }else {

      this.router.navigate(["notium/error"]);
      this.toastController.create({
        message: 'Debes iniciar sesión para acceder a esta página',
        duration: 4000,
        position: 'top',
        color: "danger"
      }).then(toast => toast.present());

    }

  }

  traerUser(){

    this.usuarioService.getUsuarioToken().subscribe(data=>{

      this.usuario = data;
      this.traerPerfil(this.usuario);

    })

  }

  traerPerfil(user:Usuario){

    this.usuarioService.traerPerfil(user).subscribe(data=>{

      this.perfil = data;

    })

  }

  async openEditProfileModal() {
    const modal = await this.modalController.create({
      component: EditarPerfilComponent
    });
    return await modal.present();
  }

  eliminarCuenta(){

    this.usuarioService.eliminarCuenta(this.usuario).subscribe(data=>{

      this.authService.logout();

      this.mensaje = data['message'];
      this.toastController.create({
        message: this.mensaje,
        duration: 3000,
        position: 'top',
        color: 'danger'
      }).then(toast => toast.present());

      this.router.navigate(['/notium']);

    });

  }

  protected readonly convertirFecha = convertirFecha;
}

function convertirFecha(fechaISO: string): string {
  const fecha = new Date(fechaISO);

  if (isNaN(fecha.getTime())) {
    throw new Error('Fecha no válida');
  }

  const dia = fecha.getUTCDate();
  const mes = fecha.getUTCMonth() + 1;
  const anyo = fecha.getUTCFullYear();

  const diaFormateado = dia < 10 ? `0${dia}` : dia.toString();
  const mesFormateado = mes < 10 ? `0${mes}` : mes.toString();

  return `${diaFormateado}/${mesFormateado}/${anyo}`;
}
