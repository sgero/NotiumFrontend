import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import {Router} from "@angular/router";
import {Usuario} from "../../models/Usuario";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class RegistroComponent implements OnInit {

  usuario = new Usuario();

  ngOnInit() {

    validarContrasena()

  }

  constructor(private usuarioService : UsuarioService, private router : Router) { }

  verificarContrasenas(): void{

    let contraseña1 = document.getElementById("contraseña") as HTMLInputElement;
    let contraseña2 = document.getElementById("repitecontraseña") as HTMLInputElement;

    if (contraseña1.value !== contraseña2.value) {
      console.log(contraseña1.value)
      console.log(contraseña2.value)
      const mensajeContraseña = document.getElementById('repiteContraseña');
      // @ts-ignore
      mensajeContraseña.innerHTML = '<span style="color: red">¡Las contraseñas no coinciden!</span>';

    }else {

      this.registrar()

    }
  }

  registrar(){

    this.usuario.rol = 'ADMIN';

    this.usuarioService.registrarUsuario(this.usuario).subscribe(data=>{

      console.log(data)
      localStorage.setItem('token', data['token'])

    })

  }

  protected readonly validarContrasena = validarContrasena;
}

function validarContrasena() {
  const contrasenaInput = document.getElementById('contraseña') as HTMLInputElement;
  const mensajeContraseña = document.getElementById('mensajeContraseña');
  const contrasena = contrasenaInput.value;

  let mensaje = '';

  // Verificar longitud mínima
  if (contrasena.length < 8) {
    mensaje += '<span style="color: red">La contraseña debe tener al menos 8 caracteres.</span><br>';
  }

  // Verificar presencia de mayúsculas
  if (!/[A-Z]/.test(contrasena)) {
    mensaje += '<span style="color: red">La contraseña debe contener al menos una mayúscula.</span><br>';
  }

  // Verificar presencia de símbolos
  if (!/[_\-$@#%&*]/.test(contrasena)) {
    mensaje += '<span style="color: red">La contraseña debe contener al menos un símbolo (_-$@#%&*).</span><br>';
  }

  if (mensaje === '') {
    mensaje = '<span style="color: green">¡La contraseña cumple con los requisitos!</span>';
  }

  // @ts-ignore
  mensajeContraseña.innerHTML = mensaje;
}
