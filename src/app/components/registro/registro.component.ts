import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import {Router} from "@angular/router";
import {Usuario} from "../../models/Usuario";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {Cliente} from "../../models/Cliente";
import {Restaurante} from "../../models/Restaurante";
import {OcioNocturno} from "../../models/OcioNocturno";
import {ClienteService} from "../../services/cliente.service";
import {RestauranteService} from "../../services/restaurante.service";
import {UserCliente} from "../../models/UserCliente";
import {OcionocturnoService} from "../../services/ocionocturno.service";
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
  ],
  standalone: true
})
export class RegistroComponent implements OnInit {

  usuarioCliente = new UserCliente();
  restaurante = new Restaurante();
  ocio_nocturno = new OcioNocturno();
  paso: number = 1;
  selectedRole: string = '';
  repiteContrasena: string = '';

  ngOnInit() {
    return null;
  }

  maxDate: string;
  constructor(private usuarioService : UsuarioService, private router : Router, private clienteService: ClienteService,
              private restauranteService: RestauranteService, private ocioNocturnoService: OcionocturnoService) {

    // Configurar la fecha máxima como el día de hoy
    this.maxDate = new Date().toISOString();

  }

  siguientePaso() {
    // Validar el paso actual antes de avanzar
    if (this.paso === 1 && !this.selectedRole) {
      // Mostrar mensaje de error o realizar alguna acción
      return;
    }

    if (this.paso === 2 && !this.validarFormularioGenerico()) {
      // Mostrar mensaje de error o realizar alguna acción
      return;
    }

    // Avanzar al siguiente paso
    this.paso++;
  }

  validarFormularioGenerico(): boolean {
    // Validar el formulario genérico antes de avanzar al siguiente paso
    if (!this.usuarioCliente.username || !this.usuarioCliente.email || !this.usuarioCliente.password || !this.repiteContrasena) {
      // Mostrar mensaje de error o realizar alguna acción
      return false;
    }

    if (this.usuarioCliente.password !== this.repiteContrasena) {
      const mensajeContraseña = document.getElementById('repiteContraseña');
      // @ts-ignore
      mensajeContraseña.innerHTML = '<span style="color: red">¡Las contraseñas no coinciden!</span>';
      return false;
    }

    return true;
  }

  pasoAtras(){

    this.paso--;

  }

  registrar(){

    if (this.selectedRole=="cliente"){

      this.usuarioCliente.rol = 1;
      this.clienteService.crearYModificarCliente(this.usuarioCliente).subscribe(data=>{

        localStorage.setItem('token', data['token'])

      })


    }if(this.selectedRole=="restaurante"){

      this.usuarioCliente.rol = 2;
      this.restauranteService.crearRestaurante(this.restaurante).subscribe(data=>{

        localStorage.setItem('token', data['token'])

      })

    }if(this.selectedRole=="ocio-nocturno"){

      this.usuarioCliente.rol = 3;
      this.ocioNocturnoService.crearOcioNocturno(this.ocio_nocturno).subscribe(data=>{

        localStorage.setItem('token', data['token'])

      })

    }

  }

  // protected readonly validarContrasena = validarContrasena;
}

// function validarContrasena() {
//   const contrasenaInput = document.getElementById('contrasena') as HTMLInputElement;
//   const mensajeContraseña = document.getElementById('mensajeContrasena');
//   const contrasena = contrasenaInput.value;
//
//   let mensaje = '';
//
//   // Verificar longitud mínima
//   if (contrasena.length < 8) {
//     mensaje += '<span style="color: red">La contraseña debe tener al menos 8 caracteres.</span><br>';
//   }
//
//   // Verificar presencia de mayúsculas
//   if (!/[A-Z]/.test(contrasena)) {
//     mensaje += '<span style="color: red">La contraseña debe contener al menos una mayúscula.</span><br>';
//   }
//
//   // Verificar presencia de símbolos
//   if (!/[_\-$@#%&*]/.test(contrasena)) {
//     mensaje += '<span style="color: red">La contraseña debe contener al menos un símbolo (_-$@#%&*).</span><br>';
//   }
//
//   if (mensaje === '') {
//     mensaje = '<span style="color: green">¡La contraseña cumple con los requisitos!</span>';
//   }
//
//   // @ts-ignore
//   mensajeContraseña.innerHTML = mensaje;
// }
