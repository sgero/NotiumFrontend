import { Component } from '@angular/core';
import {Usuario} from "../../models/Usuario";
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {IonicModule, ModalController} from "@ionic/angular";
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

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private modalController: ModalController,
    private sharedService: SharedService,
  ) { }

  async login() {
    this.usuarioService.loginUsuario(this.usuario).subscribe(data => {

      console.log(data);
      localStorage.setItem('token', data['token']);
      this.sharedService.setUsuarioToken(this.usuario);
      this.dismissModal();
      window.location.reload();

    });
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
