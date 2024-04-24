import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../models/Usuario";
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class LoginComponent {

  usuario = new Usuario();

  constructor(private usuarioService : UsuarioService, private router : Router) { }

  login(){

    this.usuarioService.loginUsuario(this.usuario).subscribe(data=>{

      console.log(data)
      localStorage.setItem('token', data['token'])

    })

  }

}
