import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";
import {UsuarioService} from "../../services/usuario.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [HeaderComponent, FooterComponent, IonicModule],
  standalone: true
})
export class HomeComponent implements OnInit {
  usuarioLogueado: any;

  constructor(private router: Router,
              private usuarioService: UsuarioService) {
  }

  onEnterButtonClickRest(): void {

    this.router.navigate(['/notium/restaurante']);


  }


  ngOnInit() {
    this.getUsuario();
  }

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

  onEnterButtonClickOcioN(usuario: any) {
    if (usuario) {
      if (usuario.rol == "CLIENTE") {
        this.router.navigate(["notium/ocionocturno"])
      } else if (usuario.rol == "OCIONOCTURNO") {
        this.router.navigate(["notium/error"])
      } else {
        this.router.navigate(["notium/error"])
      }
    } else {
      this.router.navigate(["notium/error"])
    }
  }

}


