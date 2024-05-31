import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import {Router} from "@angular/router";
import {Usuario} from "../../models/Usuario";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {ClienteService} from "../../services/cliente.service";
import {RestauranteService} from "../../services/restaurante.service";
import {UserRestaurante} from "../../models/UserRestaurante";
import {UserOcioNocturno} from "../../models/UserOcioNocturno";
import {UserCliente} from "../../models/UserCliente";
import {OcionocturnoService} from "../../services/ocionocturno.service";
import {DireccionDTO} from "../../models/DireccionDTO";
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

  user = new Usuario();
  userCliente = new UserCliente();
  userRestaurante = new UserRestaurante();
  userOcioNocturno = new UserOcioNocturno();
  direccion = new DireccionDTO();
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
    const mensajeContraseña = document.getElementById('mensajeContrasena');
    // Validar el paso actual antes de avanzar
    if (this.paso === 1 && !this.selectedRole) {
      // Mostrar mensaje de error o realizar alguna acción
      return;
    }

    // @ts-ignore
    if (this.paso === 2 && !this.validarFormularioGenerico() && mensajeContraseña.innerText != '¡La contraseña cumple con los requisitos!') {
      // Mostrar mensaje de error o realizar alguna acción
      return;
    }

    // Avanzar al siguiente paso
    this.paso++;
  }

  validarFormularioGenerico(): boolean {
    // Validar el formulario genérico antes de avanzar al siguiente paso
    if (!this.user.username || !this.user.email || !this.user.password || !this.repiteContrasena) {
      // Mostrar mensaje de error o realizar alguna acción
      return false;
    }

    if (this.user.password !== this.repiteContrasena) {
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

    this.direccion.ciudad = 'Sevilla';
    this.direccion.pais = 'España';
    this.direccion.provincia = 'Sevilla';

    if (this.selectedRole=="cliente"){

      this.userCliente.username = this.user.username;
      this.userCliente.password = this.user.password;
      this.userCliente.email = this.user.email;
      this.userCliente.direccionDTO = this.direccion;

      this.userCliente.rol = 1;

      // Fecha --> 2021-05-10T20:32:00
      this.clienteService.crearYModificarCliente(this.userCliente).subscribe(data=>{

        console.log(data)
        this.router.navigate(['/notium/login']);

      })


    }if(this.selectedRole=="restaurante"){

      this.userRestaurante.username = this.user.username;
      this.userRestaurante.password = this.user.password;
      this.userRestaurante.email = this.user.email;
      this.userRestaurante.direccionDTO = this.direccion;

      this.userRestaurante.hora_apertura = this.extraerHoraYMinuto(this.userRestaurante.hora_apertura || '');
      this.userRestaurante.hora_cierre = this.extraerHoraYMinuto(this.userRestaurante.hora_cierre || '');

      this.userRestaurante.rol = 2;

      this.restauranteService.crearRestaurante(this.userRestaurante).subscribe(data=>{

        console.log(data)
        this.router.navigate(['/notium/login']);

      })

    }if(this.selectedRole=="ocio-nocturno"){

      this.userOcioNocturno.username = this.user.username;
      this.userOcioNocturno.password = this.user.password;
      this.userOcioNocturno.email = this.user.email;
      this.userOcioNocturno.direccion = this.direccion;

      this.userOcioNocturno.hora_apertura = this.extraerHoraYMinuto(this.userOcioNocturno.hora_apertura || '');
      this.userOcioNocturno.hora_cierre = this.extraerHoraYMinuto(this.userOcioNocturno.hora_cierre || '');

      this.userOcioNocturno.rol = 3;

      this.ocioNocturnoService.crearOcioNocturno(this.userOcioNocturno).subscribe(data=>{

        console.log(data)
        this.router.navigate(['/notium/login']);

      })

    }

  }

  protected readonly validarContrasena = validarContrasena;
  protected readonly extraerHoraYMinuto = extraerHoraYMinuto;
}

function extraerHoraYMinuto(timeString: string): string {
  // Utilizamos una expresión regular para extraer la parte de la hora y los minutos de la cadena
  const timeRegex = /T(\d{2}:\d{2}):\d{2}/;
  const match = timeString.match(timeRegex);
  if (match) {
    return match[1];
  } else {
    throw new Error("Invalid time format");
  }
}

function validarContrasena() {
  const contrasenaInput = document.getElementById('contrasena') as HTMLInputElement;
  const mensajeContraseña = document.getElementById('mensajeContrasena');
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
