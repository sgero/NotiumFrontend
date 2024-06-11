import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {IonicModule, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {UsuarioService} from "../../services/usuario.service";
import {MenuLateralComponent} from "../menu-lateral/menu-lateral.component";

@Component({
  selector: 'app-homep',
  templateUrl: './homep.component.html',
  styleUrls: ['./homep.component.scss'],
  imports: [HeaderComponent, FooterComponent, IonicModule, MenuLateralComponent],
  standalone: true
})
export class HomepComponent  implements OnInit {

  usuarioLogueado: any;
  isLoggedIn: any;
  userRole: any;

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private toastController: ToastController) {
  }


  async onEnterButtonClickRest(usuario: any) {
    if (usuario) {
      if (usuario.rol == "CLIENTE" || usuario.rol == "OCIONOCTURNO" || usuario.rol == "ADMIN" || usuario.rol == "RPP" || usuario.rol == "RESTAURANTE") {
        this.router.navigate(["notium/restaurante"]);
      } else {
        this.router.navigate(["notium/error"]);
      }
    } else {
      this.router.navigate(["notium/error"]);
      const toast = await this.toastController.create({
        message: 'Debes iniciar sesión para acceder a esta página',
        duration: 4000,
        position: 'top',
        color: "danger"
      });
      toast.present();
    }
  }


  ngOnInit() {
    if (localStorage.getItem('token')){
      this.getUsuario();
    }
  }

  getUsuario() {
    this.usuarioService.getUsuarioToken().subscribe({
      next: value => {
        this.usuarioLogueado = value;
      },
      error: err => {
      }
    })
  }

  async onEnterButtonClickOcioN(usuario: any) {
    if (usuario) {
      if (usuario.rol == "CLIENTE" || usuario.rol == "OCIONOCTURNO" || usuario.rol == "ADMIN" || usuario.rol == "RPP" || usuario.rol == "RESTAURANTE") {
        this.router.navigate(["notium/ocionocturno"]);
      } else {
        this.router.navigate(["notium/error"]);
      }
    } else {
      this.router.navigate(["notium/error"]);
      const toast = await this.toastController.create({
        message: 'Debes iniciar sesión para acceder a esta página',
        duration: 4000,
        position: 'top',
        color: "danger"
      });
      toast.present();
    }
  }




}


