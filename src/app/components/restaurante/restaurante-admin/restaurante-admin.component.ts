import { Component, OnInit } from '@angular/core';
import {TurnosService} from "../../../services/turnos.service";
import {Turno} from "../../../models/Turno";
import {MesaService} from "../../../services/mesa.service";
import {Mesa} from "../../../models/Mesa";
import {MatDialog} from "@angular/material/dialog";
import {CrearMesasComponent} from "./crear-mesas/crear-mesas.component";
import {CrearTurnosComponent} from "./crear-turnos/crear-turnos.component";
import {ReservaService} from "../../../services/reserva.service";
import {Reserva} from "../../../models/Reserva";
import {CommonModule} from "@angular/common";
import {UsuarioService} from "../../../services/usuario.service";
import {CartarestauranteService} from "../../../services/cartarestaurante.service";
import {Router} from "@angular/router";
import {VisualizarComponent} from "./visualizar/visualizar.component";
import {SharedService} from "../../../services/SharedService";
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatInput, MatLabel, MatSuffix} from "@angular/material/input";
import {ReactiveFormsModule, FormsModule, FormBuilder, Validators} from "@angular/forms";
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-restaurante-admin',
  templateUrl: './restaurante-admin.component.html',
  styleUrls: ['./restaurante-admin.component.scss'],
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    MatButton,
    MatDatepickerInput,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatFormField,
    MatDatepicker,
    MatDatepickerToggle,
    MatHint,
    MatSuffix,
  ]
})
export class RestauranteAdminComponent  implements OnInit {

  turnosDisponibles: Turno[] = [];
  turnosOK: boolean = false;
  reservasDisponibles: Reserva[] = [];
  reservasOK: boolean = false;

  mesas: Mesa[] = [];
  mesasById: Mesa[] = [];
  reservas: Reserva[] = [];
  numReservas: number | undefined;
  usuario={username: ''};
  id_restaurante: any;
  fecha_reservas = this.formBuilder.group({
    fechaForm: ["", Validators.required],
  })
  fechaFormateada:any;
  fechaTexto:any;

  constructor(private turnosService: TurnosService,
              private mesaService: MesaService,
              private reservaService: ReservaService,
              private dialogRef: MatDialog,
              private usuarioservice: UsuarioService,
              private cartaservice: CartarestauranteService,
              private router : Router,
              private sharedService: SharedService,
              private formBuilder: FormBuilder) { }


  //Funciones modales
  abrirModalCrearMesa(){ this.dialogRef.open(CrearMesasComponent, {
    width: '510px',
    height:'250px'})
  }

  abrirModalCrearTurno(){ this.dialogRef.open(CrearTurnosComponent)}


  ngOnInit() {
    this.usuarioservice.getUsuarioToken().subscribe(data=>{
      this.usuario.username = data.username;
    });
  }

  getFormattedDate(): string {
    const fecha = this.fecha_reservas.get('fechaForm')?.value;
    if (fecha) {
      const date = new Date(fecha);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  }

  getFormattedDateHTML(): string {
    const fecha = this.fecha_reservas.get('fechaForm')?.value;
    if (fecha) {
      const date = new Date(fecha);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${day}-${month}-${year}`;
    }
    return '';
  }

  listarTurnos(){

    console.log(this.fecha_reservas.value.fechaForm)
    this.fechaFormateada = this.getFormattedDate();
    console.log('Fecha formateada:', this.fechaFormateada);

    this.fechaTexto = this.getFormattedDateHTML();


    this.id_restaurante = this.sharedService.getIdParamsRestaurante();

    this.turnosService.getTurnoFecha(this.id_restaurante, this.fechaFormateada).subscribe( {
      next: (responseData) => {this.turnosDisponibles = responseData;},
      error: (error) => { console.error('Error al obtener los turnos disponibles', error); },
      complete: () => { console.log('Los turnos disponibles: ', this.turnosDisponibles);}
    });

    this.turnosOK = true;
    this.reservasOK=false;

  }


  listarReservas(turnoElegido: Turno){
    console.log(turnoElegido)


    this.reservaService.getReservaFechaTurno(turnoElegido.id ,this.id_restaurante, this.fechaFormateada).subscribe( {
      next: (responseData) => {this.reservasDisponibles = responseData;},
      error: (error) => { console.error('Error al obtener las reservas', error); },
      complete: () => { console.log('Las reservas disponibles: ', this.reservasDisponibles);}
    });

    this.reservasOK = true;
  }


  crearCartaRes(){
    this.cartaservice.crearCartaRes(this.usuario).subscribe(data =>{
      console.log(data);
    });
    this.router.navigate(['/cartaRestaurante']);
  }

  getReservas(){
    this.listarTurnos();
    this.listarMesas();
    this.reservaService.getReservas(this.id_restaurante, this.fechaFormateada).subscribe( {
      next: (responseData) => {this.reservasDisponibles = responseData;},
      error: (error) => { console.error('Error al obtener las reservas', error); },
      complete: () => { console.log('Las reservas disponibles: ', this.reservasDisponibles);}
    });
  }

  listarMesas(){
    this.mesaService.getAllMesasById(this.id_restaurante).subscribe({
      next: value => {
        if (value){
          this.mesasById = value;
        }
      }
    })
  }


}
