import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../models/Usuario";
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

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

  // username: string | undefined;
  // password: string | undefined;
  //
  // constructor(private authService: AuthService) { }
  //
  // login() {
  //   this.authService.login(this.username, this.password).subscribe(response => {
  //     console.log('Logged in with role:', response.role);
  //     // Aquí puedes redirigir al usuario a la página correspondiente según su rol, si es necesario
  //   }, error => {
  //     console.error('Login failed', error);
  //   });
  // }

}
