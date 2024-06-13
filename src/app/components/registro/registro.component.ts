import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import {Router} from "@angular/router";
import {Usuario} from "../../models/Usuario";
import {FormsModule} from "@angular/forms";
import {IonicModule, ModalController, ToastController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {ClienteService} from "../../services/cliente.service";
import {RestauranteService} from "../../services/restaurante.service";
import {UserRestaurante} from "../../models/UserRestaurante";
import {UserOcioNocturno} from "../../models/UserOcioNocturno";
import {UserCliente} from "../../models/UserCliente";
import {OcionocturnoService} from "../../services/ocionocturno.service";
import {DireccionDTO} from "../../models/DireccionDTO";
import {LoginComponent} from "../login/login.component";
import {Observable} from "rxjs";
import {Clase} from "../../models/Clase";
import {ClaseService} from "../../services/clase.service";
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
  repiteEmailUsername : boolean = true;
  clases: Clase[] = [];

  ngOnInit() {
    this.getAllClases();
  }

  maxDate: string;
  constructor(private usuarioService : UsuarioService,
              private router : Router,
              private clienteService: ClienteService,
              private restauranteService: RestauranteService,
              private ocioNocturnoService: OcionocturnoService,
              private modalController: ModalController,
              private toastController: ToastController,
              private claseService: ClaseService,) {

    this.maxDate = new Date().toISOString();


  }

  async siguientePaso() {
    if (this.paso === 1 && !this.selectedRole) {
      return;
    }

    if (this.paso === 2) {
      this.validaUsernameEmailExistentes().subscribe((existe: boolean) => {
        this.repiteEmailUsername = existe;

        if (!this.validarFormularioGenerico() || this.repiteEmailUsername) {
          if (this.repiteEmailUsername) {
            this.toastController.create({
              message: 'El username o el email ya existen',
              duration: 2000,
              position: 'top',
              color: 'danger'
            }).then(toast => toast.present());
          }
          return;
        }

        this.paso++;
      });
    } else {
      this.paso++;
    }
  }

  validaUsernameEmailExistentes(): Observable<boolean> {
    return this.usuarioService.validaUsernameEmailExistentes(this.user);
  }

  getAllClases() {
    this.claseService.getAllClases().subscribe(data=>{

      this.clases = data;

    })
  };

  validarFormularioGenerico(): boolean {
    if (!this.user.username || !this.user.email || !this.user.password || !this.repiteContrasena) {
      this.toastController.create({
        message: 'Hay algún campo no rellenado.',
        duration: 2000,
        position: 'top',
        color: 'danger'
      }).then(toast => toast.present());
      return false;
    }

    if (this.user.password !== this.repiteContrasena) {
      this.toastController.create({
        message: 'Las contraseñas no coinciden.',
        duration: 2000,
        position: 'top',
        color: 'danger'
      }).then(toast => toast.present());
      return false;
    }

    return true;
  }

  pasoAtras(){

    this.paso--;

  }

  async login() {
    const modal = await this.modalController.create({
      component: LoginComponent, // Reemplaza LoginComponent por el nombre de tu componente de inicio de sesión
      componentProps: {
        // Puedes pasar cualquier dato necesario al modal
      }
    });
    await modal.present();
  }

  registrar() {
    this.direccion.pais = 'España';

    if (this.selectedRole=="cliente"){

      this.userCliente.username = this.user.username;
      this.userCliente.password = this.user.password;
      this.userCliente.email = this.user.email;
      this.userCliente.direccionDTO = this.direccion;

      this.userCliente.rol = 1;

      this.clienteService.crearYModificarCliente(this.userCliente).subscribe(data=>{
        console.log(data);
        this.login();
        this.dismissModal();
      });

    } else if(this.selectedRole=="restaurante"){

      this.userRestaurante.username = this.user.username;
      this.userRestaurante.password = this.user.password;
      this.userRestaurante.email = this.user.email;
      this.userRestaurante.direccionDTO = this.direccion;

      this.userRestaurante.hora_apertura = this.extraerHoraYMinuto(this.userRestaurante.hora_apertura || '');
      this.userRestaurante.hora_cierre = this.extraerHoraYMinuto(this.userRestaurante.hora_cierre || '');

      this.userRestaurante.rol = 2;

      this.restauranteService.crearRestaurante(this.userRestaurante).subscribe(data=>{
        console.log(data);
        this.login();
        this.dismissModal();
      });

    } else if(this.selectedRole=="ocio-nocturno"){

      this.userOcioNocturno.username = this.user.username;
      this.userOcioNocturno.password = this.user.password;
      this.userOcioNocturno.email = this.user.email;
      this.userOcioNocturno.direccion = this.direccion;

      this.userOcioNocturno.hora_apertura = this.extraerHoraYMinuto(this.userOcioNocturno.hora_apertura || '');
      this.userOcioNocturno.hora_cierre = this.extraerHoraYMinuto(this.userOcioNocturno.hora_cierre || '');

      this.userOcioNocturno.rol = 3;

      this.ocioNocturnoService.crearOcioNocturno(this.userOcioNocturno).subscribe(data=>{
        console.log(data);
        this.login();
        this.dismissModal();
      });
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }


  protected readonly extraerHoraYMinuto = extraerHoraYMinuto;
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
