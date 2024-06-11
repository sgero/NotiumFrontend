import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {IonicModule, ModalController} from "@ionic/angular";
import {UsuarioService} from "../../services/usuario.service";
import {Usuario} from "../../models/Usuario";
import {FormsModule} from "@angular/forms";
import {EditarPerfilComponent} from "./editar-perfil/editar-perfil.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [HeaderComponent, FooterComponent, IonicModule, FormsModule],
  standalone: true
})
export class PerfilComponent  implements OnInit {

  usuario: Usuario = new Usuario();
  perfil:any;
  mensaje='';

  constructor(private usuarioService: UsuarioService,
              private modalController: ModalController,
              private router: Router,) { }

  ngOnInit() {

    this.traerUser();

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

      this.mensaje = data['message'];

    });

  }

}
