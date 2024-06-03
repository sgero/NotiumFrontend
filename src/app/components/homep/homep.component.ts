import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {IonicModule, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {UsuarioService} from "../../services/usuario.service";
import {AuthService} from "../../services/auth.service";
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
  // isLoggedIn: boolean | undefined;
  // userRole: string | null | undefined;
  isLoggedIn: any;
  userRole: any;

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              // private authService: AuthService
              private toastController: ToastController
              ) {
  }




  // onEnterButtonClickRest(): void {
  //
  //   this.router.navigate(['/notium/restaurante']);
  //
  //
  // }

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
        duration: 4000, // Duración en milisegundos
        position: 'top', // Posición del toast
        // cssClass: 'custom-toast'
        color: "danger"
      });
      toast.present(); // Muestra el toast
    }
  }


  ngOnInit() {
    this.getUsuario();
  }
  //   this.isLoggedIn = this.authService.isUserLoggedIn();
  //   this.userRole = this.authService.getUserRole();
  // }
  //
  // logout() {
  //   this.authService.logout();
  //   this.isLoggedIn = false;
  //   this.userRole = null;
  // }


  getUsuario() {
    this.usuarioService.getUsuarioToken().subscribe({
      next: value => {
        this.usuarioLogueado = value;
      },
      error: err => {
        console.error(err);
      }
    })
  }

  // onEnterButtonClickOcioN(usuario: any) {
  //   if (usuario) {
  //     if (usuario.rol == "CLIENTE") {
  //       this.router.navigate(["notium/ocionocturno"])
  //     } else if (usuario.rol == "OCIONOCTURNO") {
  //       this.router.navigate(["notium/ocionocturno"])
  //     } else {
  //       this.router.navigate(["notium/error"])
  //     }
  //   } else {
  //     this.router.navigate(["notium/error"])
  //   }
  // }

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
        duration: 4000, // Duración en milisegundos
        position: 'top', // Posición del toast
        // cssClass: 'custom-toast'
        color: "danger"
      });
      toast.present(); // Muestra el toast
    }
  }




}


