import {Component, Input, NgModule, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IonicModule, ModalController} from "@ionic/angular";
import { MatDialog, MAT_DIALOG_DATA,
        MatDialogModule} from "@angular/material/dialog";

import {  } from "@angular/material/dialog";

//Imports de componentes
import {PruebaPage} from "../prueba/prueba.page";
import {restaurant} from "ionicons/icons";
import {HacerValoracionComponent} from "../hacer-valoracion/hacer-valoracion.component";
import {HacerReservaComponent} from "../hacer-reserva/hacer-reserva.component";
import {SharedService} from "../../../services/SharedService";
import {Restaurante} from "../../../models/Restaurante";
import {ActivatedRoute} from "@angular/router";
import {RestauranteService} from "../../../services/restaurante.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {UsuarioService} from "../../../services/usuario.service";

@Component({
  selector: 'app-restaurante-user',
  templateUrl: './restaurante-user.component.html',
  styleUrls: ['./restaurante-user.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    MatFormField, MatInputModule, FormsModule, MatButtonModule
  ],
  standalone: true
})



export class RestauranteUserComponent  implements OnInit {

  info: string = 'info';
  estilo1_info: boolean = false;
  estilo2_info: boolean = true;
  estilo1_carta: boolean = true;
  estilo2_carta: boolean = false;

  //Variabales
  restaurante = new Restaurante();
  id_restaurante: any;
  usuario: any;
  inicio: boolean = false;
  valoracion_restaurante: number = 0.0;

  constructor(private modalController: ModalController,
              private sharedService: SharedService,
              private restauranteService: RestauranteService,
              private usuarioService: UsuarioService,
              private _route: ActivatedRoute,
              private dialogRef: MatDialog) {
    this.id_restaurante = this._route.snapshot.paramMap.get('id');
  }

  //Funciones modales
  abrirModalValoraciones(){
     const dialogRef = this.dialogRef.open(HacerValoracionComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Chat cerrado');
    });
  }

  abrirModalReserva(){ this.dialogRef.open(HacerReservaComponent); }

  setearIDParams(){ this.sharedService.setIdParamsRestaurante(Number(this.id_restaurante)); }

  captarRestaurantePorId(){
    this.restauranteService.getRestauranteByID(Number(this.id_restaurante)).subscribe( {
      next: (responseData) => {
        this.restaurante = responseData;
        this.sharedService.setRestaurante(this.restaurante)
      },
      error: (error) => { console.error('Error al obtener el restaurante por ID:', error); },
      complete: () => { console.log('Restaurante captado por id', this.restaurante);}
    });
  }

  valoracionRestaurante(){
    this.restauranteService.getValoracionRestauranteByID(Number(this.id_restaurante)).subscribe( {
      next: (valoracion_capada) => { this.valoracion_restaurante = valoracion_capada; },
      error: (error) => { console.error('Error al obtener el restaurante por ID:', error); },
      complete: () => { console.log('Valoración del restaurante', this.valoracion_restaurante); }
    });
  }

  getUsuarioPorToken(){

    this.usuarioService.getUsuarioToken().subscribe( {
      next: (usuario) => { this.usuario = usuario; },
      error: (error) => { console.error('Error al obtener el Usuario:', error); },
      complete: () => { console.log('Usuario', this.usuario); }
    });


  }

  ngOnInit() {

    //Funciones externas
    this.captarRestaurantePorId();
    this.valoracionRestaurante();
    this.setearIDParams();
    this.getUsuarioPorToken();
    this.inicio = true;
  }

  Info(){
    this.estilo2_info = true;
    this.estilo2_carta = false;
    this.info = 'info';
  }

  Carta(){
    this.estilo1_info = true;
    this.estilo2_info = false;

    this.estilo1_carta = false;
    this.estilo2_carta = true
    this.info = 'Carta';
  }
}


