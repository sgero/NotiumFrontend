import { Component } from '@angular/core';
import {Usuario} from "../../models/Usuario";
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {IonicModule, ModalController, ToastController} from "@ionic/angular";
import {SharedService} from "../../services/SharedService";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule,
    IonicModule,
    NgIf
  ],
  standalone: true
})
export class LoginComponent {

  usuario = new Usuario();
  isToastOpen = false;
  mensaje = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private modalController: ModalController,
    private sharedService: SharedService,
  ) { }

  login() {

    this.usuarioService.loginUsuario(this.usuario).subscribe(data => {

      if (data['token'] == ""){

        this.isToastOpen = true;
        this.mensaje = data['message'];
        setTimeout(() => {
          this.dismissModal();
        }, 5000);

      }else{

        localStorage.setItem('token', data['token']);
        this.sharedService.setUsuarioToken(this.usuario);
        this.dismissModal();
        window.location.reload();

      }

    });

  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
