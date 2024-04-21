import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  standalone: true
})
export class RegistroComponent   {

  // quitado el Implements OnInit

  // constructor() { }
  //
  // ngOnInit() {}

  nuevoUsuario: any = {};

  constructor(private usuarioService: UsuarioService) { }

  registrarUsuario(): void {
    this.usuarioService.registrarUsuario(this.nuevoUsuario)
      .subscribe(
        response => {
          console.log('Usuario registrado exitosamente:', response);
          // Aquí podrías redireccionar al usuario a otra página o mostrar un mensaje de éxito
        },
        error => {
          console.error('Error al registrar usuario:', error);
          // Aquí podrías mostrar un mensaje de error al usuario en tu frontend
        }
      );
  }
}


