import {Component, Input, NgModule, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IonicModule, ModalController} from "@ionic/angular";
import { MatDialog, MAT_DIALOG_DATA,
        MatDialogModule} from "@angular/material/dialog";

import {  } from "@angular/material/dialog";

//Imports de componentes
import {restaurant} from "ionicons/icons";
import {HacerValoracionComponent} from "../hacer-valoracion/hacer-valoracion.component";
import {CrearReservaComponent} from "../crear-reserva/crear-reserva.component";
import {SharedService} from "../../../services/SharedService";
import {Restaurante} from "../../../models/Restaurante";
import {ActivatedRoute, Router} from "@angular/router";
import {RestauranteService} from "../../../services/restaurante.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {UsuarioService} from "../../../services/usuario.service";
import {CartaclienterestauranteComponent} from "../../cartaclienterestaurante/cartaclienterestaurante.component";
import {ComentarioRestaurante} from "../../../models/ComentarioRestaurante";
import {Cliente} from "../../../models/Cliente";

@Component({
  selector: 'app-restaurante-user',
  templateUrl: './restaurante-user.component.html',
  styleUrls: ['./restaurante-user.component.scss'],
  imports: [
    CartaclienterestauranteComponent,
    IonicModule,
    CommonModule,
    MatDialogModule
  ],
  standalone: true
})



export class RestauranteUserComponent  implements OnInit {

  info: string = 'info';
  valoracion: string = '';
  carta: string= '';
  estilo1_info: boolean = false;
  estilo2_info: boolean = true;
  estilo1_carta: boolean = true;
  estilo2_carta: boolean = false;
  estilo1_valoraciones: boolean = true;
  estilo2_valoraciones: boolean = false;

  //Variabales
  restaurante = new Restaurante();
  id_restaurante: any;
  usuario: any;
  inicio: boolean = false;
  usuarioCli = false;
  valoraciones: ComentarioRestaurante[] = [];

  constructor(private modalController: ModalController,
              private sharedService: SharedService,
              private restauranteService: RestauranteService,
              private usuarioService: UsuarioService,
              private _route: ActivatedRoute,
              private dialogRef: MatDialog,
              private router : Router) {
    this.id_restaurante = this._route.snapshot.paramMap.get('id');
  }

  //Funciones modales
  abrirModalValoraciones(){
    if (this.usuarioCli){
     const dialogRef = this.dialogRef.open(HacerValoracionComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Chat cerrado');
    });
    }
  }


  abrirModalReserva() {
    if (this.usuarioCli){
    const dialogRef = this.dialogRef.open(CrearReservaComponent, {
      width: '500px',
      data: {
        restauranteId: this.id_restaurante,
        actualrest: this.restaurante
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de reserva se ha cerrado');
      // Puedes realizar acciones después de cerrar el modal si es necesario
    });
    }
  }

  setearIDParams(){ this.sharedService.setIdParamsRestaurante(Number(this.id_restaurante)); }

  traerRestaurante(){
    this.restaurante = this.sharedService.getRestaurante();
    console.log(this.restaurante);
  }

  valoracionesRestaurante(){
    this.restauranteService.getComentarioRestaurante(Number(this.id_restaurante)).subscribe( {
      next: (data) => { this.valoraciones = data; },
      error: (error) => { console.error('Error al obtener las valoraciones del restaurante:', error); },
      complete: () => { console.log('Las valoraciones del restaurante', this.valoraciones); }
    });
  }

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

  ngOnInit() {
    if (localStorage.length === 0){
      this.router.navigate(['/notium']);
    }
    this.usuarioService.getUsuarioToken().subscribe(data=> {
      if (data.rol?.toString() === "CLIENTE"){
        this.usuarioCli = true;
      }
    })
    //Funciones externas
    this.traerRestaurante();
    this.captarRestaurantePorId();
    this.setearIDParams();
    this.inicio = true;
    this.valoracionesRestaurante();
  }

  Info(){
    this.estilo2_info = true;
    this.estilo2_valoraciones = false;
    this.estilo2_carta = false;
    this.info = 'info';
    this.valoracion = '';
    this.carta = '';
  }

  Valoracion(){
    this.valoracion = 'valoracion';
    this.estilo1_valoraciones = false;
    this.estilo2_valoraciones = true;
    this.estilo1_info=true;
    this.estilo2_info=false;
    this.estilo1_carta=true;
    this.estilo2_carta=false;
    this.info='nope';
    this.carta = '';

  }

  Carta(){
    this.estilo1_info = true;
    this.estilo2_info = false;
    this.estilo2_valoraciones = false;

    this.estilo1_carta = false;
    this.estilo2_carta = true
    this.carta = 'carta';
    this.valoracion='';
    this.info='';

  }
}


