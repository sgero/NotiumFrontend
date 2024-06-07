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

@Component({
  selector: 'app-restaurante-admin',
  templateUrl: './restaurante-admin.component.html',
  styleUrls: ['./restaurante-admin.component.scss'],
  standalone: true,
    imports: [
        CommonModule,
        MatButton,
    ]
})
export class RestauranteAdminComponent  implements OnInit {

  turnos: Turno[] = [];
  mesas: Mesa[] = [];
  reservas: Reserva[] = [];
  numReservas: number | undefined;
  usuario={username: ''};
  id_restaurante: any;

  constructor(private turnosService: TurnosService,
              private mesaService: MesaService,
              private reservaService: ReservaService,
              private dialogRef: MatDialog,
              private usuarioservice: UsuarioService,
              private cartaservice: CartarestauranteService,
              private router : Router,
              private sharedService: SharedService) { }


  //Funciones modales
  abrirModalCrearMesa(){ this.dialogRef.open(CrearMesasComponent, {
    width: '510px',
    height:'250px'})
  }

  abrirModalCrearTurno(){ this.dialogRef.open(CrearTurnosComponent, {
    width: '510px',
    height:'300px'})
  }

  listarMesas(){
    this.dialogRef.open(VisualizarComponent, {
      width: '510px'
    })
  }

  listarTurnos(){
    this.dialogRef.open(VisualizarComponent, {
      width: '510px',
      data:'turnos'
    })
  }

  ngOnInit() {
    this.listarReserva();
    this.usuarioservice.getUsuarioToken().subscribe(data=>{
      this.usuario.username = data.username;
    });
  }

  /*  listarTurnos(){
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
    }*/

  listarReserva(){

    this.id_restaurante = this.sharedService.getIdParamsRestaurante();

    this.reservaService.getReservaRestaurante(this.id_restaurante).subscribe( {
      next: (data) => { this.reservas = data; },
      error: (error) => { console.error('Error al listar las reservas', error); },
      complete: () => {
        console.log('El listado de reservas:', this.reservas);
        this.numReservas = this.reservas.length;
      }
    });
  }

  crearCartaRes(){
    this.cartaservice.crearCartaRes(this.usuario).subscribe(data =>{
      console.log(data);
    });
    this.router.navigate(['/cartaRestaurante']);
  }

}
