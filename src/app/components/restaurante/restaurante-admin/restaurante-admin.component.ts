import { Component, OnInit } from '@angular/core';
import {TurnosService} from "../../../services/turnos.service";
import {Turno} from "../../../models/Turno";
import {MesaService} from "../../../services/mesa.service";
import {Mesa} from "../../../models/Mesa";
import {MatDialog} from "@angular/material/dialog";
import {CrearReservaComponent} from "../crear-reserva/crear-reserva.component";
import {CrearMesasComponent} from "./crear-mesas/crear-mesas.component";
import {CrearTurnosComponent} from "./crear-turnos/crear-turnos.component";
import {ReservaService} from "../../../services/reserva.service";
import {Reserva} from "../../../models/Reserva";
import {CommonModule} from "@angular/common";
import {UsuarioService} from "../../../services/usuario.service";
import {CartarestauranteService} from "../../../services/cartarestaurante.service";

@Component({
  selector: 'app-restaurante-admin',
  templateUrl: './restaurante-admin.component.html',
  styleUrls: ['./restaurante-admin.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class RestauranteAdminComponent  implements OnInit {

  turnos: Turno[] = [];
  mesas: Mesa[] = [];
  reservas: Reserva[] = [];
  usuario={username: ''};

  constructor(private turnosService: TurnosService,
              private mesaService: MesaService,
              private reservaService: ReservaService,
              private dialogRef: MatDialog,
              private usuarioservice: UsuarioService,
              private cartaservice: CartarestauranteService) { }


  //Funciones modales
  abrirModalCrearMesa(){ this.dialogRef.open(CrearMesasComponent); }

  abrirModalCrearTurno(){ this.dialogRef.open(CrearTurnosComponent); }

  ngOnInit() {
    this.listarReserva();
    this.usuarioservice.getUsuarioToken().subscribe(data=>{
      this.usuario.username = data.username;
    });
  }

  listarTurnos(){
    this.turnosService.getAllTurnos().subscribe( {
      next: (data) => { this.turnos = data; },
      error: (error) => { console.error('Error al listar los turnos', error); },
      complete: () => { console.log('El listado con todos los turnos:', this.turnos); }
    });
  }

  listarMesas(){
    this.mesaService.getAllMesas().subscribe( {
      next: (data) => { this.mesas = data; },
      error: (error) => { console.error('Error al listar lasmesas', error); },
      complete: () => { console.log('El listado con todos las mesas:', this.mesas); }
    });
  }

  listarReserva(){
    this.reservaService.getAllReserva().subscribe( {
      next: (data) => { this.reservas = data; },
      error: (error) => { console.error('Error al listar las reservas', error); },
      complete: () => { console.log('El listado de reservas:', this.reservas); }
    });
  }

  crearCartaRes(){
    this.cartaservice.crearCartaRes(this.usuario).subscribe(data =>{
      console.log(data);
    })
  }

}
