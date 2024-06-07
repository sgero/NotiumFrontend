import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {IonicModule} from "@ionic/angular";
import {UsuarioService} from "../../services/usuario.service";
import {Usuario} from "../../models/Usuario";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [HeaderComponent, FooterComponent, IonicModule, FormsModule],
  standalone: true
})
export class PerfilComponent  implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {

    this.traerUser();

  }

  traerUser(){

    this.usuarioService.getUsuarioToken().subscribe(data=>{

      this.usuario = data;
      console.log(data)

    })

  }

}
