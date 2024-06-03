import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../models/Usuario";
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {SharedService} from "../../services/SharedService";

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

  constructor(private usuarioService : UsuarioService,
              private router : Router,
              private sharedService: SharedService) { }

  login(){

    this.usuarioService.loginUsuario(this.usuario).subscribe(data=>{

      console.log(data)
      localStorage.setItem('token', data['token'])
    })

    this.usuarioService.getUsuarioToken().subscribe( {
      next: (usuario) => {
        this.usuario = usuario;
        this.sharedService.setUsuarioToken(usuario)},
      error: (error) => { console.error('Error al obtener el usuario por token:', error); },
      complete: () => { console.log('Usuario por token:', this.usuario); }
    });

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
