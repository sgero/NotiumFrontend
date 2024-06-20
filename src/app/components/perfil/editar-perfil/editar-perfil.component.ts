import { Component, OnInit } from '@angular/core';
import {IonicModule, ModalController, ToastController} from "@ionic/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Usuario} from "../../../models/Usuario";
import {UsuarioService} from "../../../services/usuario.service";
import {Router} from "@angular/router";
import {SharedService} from "../../../services/SharedService";
import {NgIf} from "@angular/common";
import {ClienteService} from "../../../services/cliente.service";
import {OcionocturnoService} from "../../../services/ocionocturno.service";
import {RestauranteService} from "../../../services/restaurante.service";
import {UserRestaurante} from "../../../models/UserRestaurante";
import {UserCliente} from "../../../models/UserCliente";
import {UserOcioNocturno} from "../../../models/UserOcioNocturno";

@Component({
    selector: 'app-editar-perfil',
    templateUrl: './editar-perfil.component.html',
    styleUrls: ['./editar-perfil.component.scss'],
  imports: [
    FormsModule,
    IonicModule,
    NgIf,
    ReactiveFormsModule
  ],
  standalone: true,
})
export class EditarPerfilComponent  implements OnInit {

  usuario = new Usuario();
  perfil:any;

  constructor(
    private usuarioService: UsuarioService,
    private clienteService: ClienteService,
    private restauranteService: RestauranteService,
    private ocionocturnoService: OcionocturnoService,
    private router: Router,
    private modalController: ModalController,
    private sharedService: SharedService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {

    this.traerUser();

  }

  traerUser(){

    this.usuarioService.getUsuarioToken().subscribe(data=>{

      this.usuario = data;
      console.log(this.usuario);
      if (this.usuario.rol !== 'ADMIN'){
        this.traerPerfil(this.usuario);
      }

    })

  }

  traerPerfil(user:Usuario){

    this.usuarioService.traerPerfil(user).subscribe(data=>{

      this.perfil = data;
      console.log(this.perfil);

    })

  }

  editar(){

      if (this.usuario.rol == "CLIENTE"){

        let userCliente = new UserCliente();
        userCliente.id = this.perfil.id;
        userCliente.username = this.usuario.username;
        userCliente.email = this.usuario.email;
        userCliente.nombre = this.perfil.nombre;
        userCliente.apellidos = this.perfil.apellidos;
        userCliente.telefono = this.perfil.telefono;
        userCliente.dni = this.perfil.dni;
        userCliente.fechaNacimiento = this.perfil.fechaNacimiento;
        userCliente.direccionDTO.calle = this.perfil.direccionDTO.calle;
        userCliente.direccionDTO.numero = this.perfil.direccionDTO.numero;
        userCliente.direccionDTO.puerta = this.perfil.direccionDTO.puerta;
        userCliente.direccionDTO.codigoPostal = this.perfil.direccionDTO.codigoPostal;
        userCliente.direccionDTO.ciudad = this.perfil.direccionDTO.ciudad;
        userCliente.direccionDTO.provincia = this.perfil.direccionDTO.provincia;
        userCliente.direccionDTO.pais = "España";

        this.clienteService.crearYModificarCliente(userCliente).subscribe(data=>{

          console.log(data);
          this.toastController.create({
            message: 'Se ha modificado correctamente.',
            duration: 4000,
            position: 'top',
            color: "success"
          }).then(toast => toast.present());
          window.location.reload();

        }, error => {

          console.log(error);

        })

      }else if(this.usuario.rol == "RESTAURANTE"){

        let userRestaurante = new UserRestaurante();
        userRestaurante.id = this.perfil.id;
        userRestaurante.username = this.usuario.username;
        userRestaurante.email = this.usuario.email;
        userRestaurante.nombre = this.perfil.nombre;
        userRestaurante.telefono = this.perfil.telefono;
        userRestaurante.cif = this.perfil.cif;
        userRestaurante.imagen_marca = this.perfil.imagen_marca;
        userRestaurante.aforo = this.perfil.aforo;
        userRestaurante.hora_apertura = this.perfil.hora_apertura;
        userRestaurante.hora_cierre = this.perfil.hora_cierre;
        userRestaurante.direccionDTO.calle = this.perfil.direccionDTO.calle;
        userRestaurante.direccionDTO.numero = this.perfil.direccionDTO.numero;
        userRestaurante.direccionDTO.puerta = this.perfil.direccionDTO.puerta;
        userRestaurante.direccionDTO.codigoPostal = this.perfil.direccionDTO.codigoPostal;
        userRestaurante.direccionDTO.ciudad = this.perfil.direccionDTO.ciudad;
        userRestaurante.direccionDTO.provincia = this.perfil.direccionDTO.provincia;
        userRestaurante.direccionDTO.pais = "España";

        this.restauranteService.crearRestaurante(userRestaurante).subscribe(data=>{

          console.log(data);
          this.toastController.create({
            message: 'Se ha modificado correctamente.',
            duration: 4000,
            position: 'top',
            color: "success"
          }).then(toast => toast.present());
          window.location.reload();

        }, error => {

          console.log(error);

        })

      }else if(this.usuario.rol == "OCIONOCTURNO"){

        let userOcioNocturno = new UserOcioNocturno();
        userOcioNocturno.id = this.perfil.id;
        userOcioNocturno.username = this.usuario.username;
        userOcioNocturno.email = this.usuario.email;
        userOcioNocturno.nombre = this.perfil.nombre;
        userOcioNocturno.telefono = this.perfil.telefono;
        userOcioNocturno.cif = this.perfil.cif;
        userOcioNocturno.imagenMarca = this.perfil.imagenMarca;
        userOcioNocturno.aforo = this.perfil.aforo;
        userOcioNocturno.horaApertura = this.perfil.horaApertura;
        userOcioNocturno.horaCierre = this.perfil.horaCierre;

        userOcioNocturno.horaApertura = extraerHoraYMinuto(userOcioNocturno.horaApertura || '');
        userOcioNocturno.horaCierre = extraerHoraYMinuto(userOcioNocturno.horaCierre || '');

        userOcioNocturno.horaApertura = anyadirSegundos(userOcioNocturno.horaApertura);
        userOcioNocturno.horaCierre = anyadirSegundos(userOcioNocturno.horaCierre);

        userOcioNocturno.direccionDTO.calle = this.perfil.direccionDTO.calle;
        userOcioNocturno.direccionDTO.numero = this.perfil.direccionDTO.numero;
        userOcioNocturno.direccionDTO.puerta = this.perfil.direccionDTO.puerta;
        userOcioNocturno.direccionDTO.codigoPostal = this.perfil.direccionDTO.codigoPostal;
        userOcioNocturno.direccionDTO.ciudad = this.perfil.direccionDTO.ciudad;
        userOcioNocturno.direccionDTO.provincia = this.perfil.direccionDTO.provincia;
        userOcioNocturno.direccionDTO.pais = "España";

        this.ocionocturnoService.crearOcioNocturno(userOcioNocturno).subscribe(data=>{

          console.log(data);
          this.toastController.create({
            message: 'Se ha modificado correctamente.',
            duration: 4000,
            position: 'top',
            color: "success"
          }).then(toast => toast.present());
          window.location.reload();

        }, error => {

          console.log(error);

        })

      }else if(this.usuario.rol == "ADMIN"){

        let usuario = new Usuario();
        usuario.id = this.usuario.id;
        usuario.username = this.usuario.username;
        usuario.email = this.usuario.email;
        usuario.rol = this.usuario.rol;

        this.usuarioService.editarUsuario(usuario).subscribe(data=>{

          console.log(data);
          this.toastController.create({
            message: 'Se ha modificado correctamente.',
            duration: 4000,
            position: 'top',
            color: "success"
          }).then(toast => toast.present());
          window.location.reload();


        }, error => {

          console.log(error);

        })

      }

  }

  closeModal() {
    this.modalController.dismiss();
  }

}

function extraerHoraYMinuto(timeString: string): string {
  const timeRegex = /T(\d{2}:\d{2}):\d{2}/;
  const match = timeString.match(timeRegex);
  if (match) {
    return match[1];
  } else {
    return timeString;
  }
}

function anyadirSegundos(time: string): string {
  // Verificamos si la cadena ya incluye los segundos
  const timeParts = time.split(':');

  // Si hay tres partes (hora, minuto, segundos), devolvemos la cadena tal cual
  if (timeParts.length === 3) {
    return time;
  }

  // Si hay dos partes (hora, minuto), agregamos ":00" al final
  if (timeParts.length === 2) {
    return `${time}:00`;
  }

  // Si el formato no es correcto, lanzamos un error
  throw new Error('Formato de tiempo no válido. Use "HH:MM" o "HH:MM:SS".');
}
