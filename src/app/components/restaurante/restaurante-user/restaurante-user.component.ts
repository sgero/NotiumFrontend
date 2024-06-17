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
import {MatButton, MatButtonModule} from "@angular/material/button";
import {UsuarioService} from "../../../services/usuario.service";
import {CartaclienterestauranteComponent} from "../../cartaclienterestaurante/cartaclienterestaurante.component";
import {ComentarioRestaurante} from "../../../models/ComentarioRestaurante";
import {Cliente} from "../../../models/Cliente";
import {MapaComponent} from "../../mapa/mapa.component";
import {DireccionDTO} from "../../../models/DireccionDTO";

@Component({
  selector: 'app-restaurante-user',
  templateUrl: './restaurante-user.component.html',
  styleUrls: ['./restaurante-user.component.scss'],
  imports: [
    CartaclienterestauranteComponent,
    IonicModule,
    CommonModule,
    MatDialogModule,
    MatButton,
    MapaComponent
  ],
  standalone: true
})



export class RestauranteUserComponent  implements OnInit {

  //info: string = 'info';
  valoracion: string = '';
  carta: string= '';


  //Variabales
  restaurante = new Restaurante();
  id_restaurante: any;
  usuario: any;
  inicio: boolean = false;
  usuarioCli = false;
  valoraciones: ComentarioRestaurante[] = [];
  numValoraciones: number | undefined;
  valoracion_restaurante: number = 0.0;
  rankingRestaurante: number[] = [];
  restauranteEnRanking: boolean = false;

  @Input() direccion!: DireccionDTO;

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

  abrirModalReserva() {
    if (this.usuarioCli){
    const dialogRef = this.dialogRef.open(CrearReservaComponent, {
      width: '500px',
      data: {
        restauranteId: this.id_restaurante,
        actualrest: this.restaurante
      }
    });
    }
  }

  Carta(){
    //Modal de carta
    this.carta = 'carta';
  }

  valoracionRestaurante(){
    this.restauranteService.getValoracionRestauranteByID(Number(this.id_restaurante)).subscribe( {
      next: (valoracion_capada) => { this.valoracion_restaurante = valoracion_capada; },
      error: (error) => { console.error('Error al obtener el restaurante por ID:', error); },
      complete: () => { console.log('Valoración del restaurante', this.valoracion_restaurante); }
    });
  }

  rankingRestaurantes(){
    this.restauranteService.getRankingRestaurantes().subscribe( {
      next: (data) => { this.rankingRestaurante = data; },
      error: (error) => { console.error('Error al el ranking de restaurantes', error); },
      complete: () => {
        console.log('El ranking de restaurante es:', this.rankingRestaurante);
        this.restauranteEnRanking = this.rankingRestaurante.includes(Number(this.sharedService.getIdParamsRestaurante()))

        if(this.restauranteEnRanking == true ){
          console.log('Está en ranking')
        }else {
          console.log('No está en ranking')
        }
      }
    });
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
      complete: () => {
        console.log('Las valoraciones del restaurante', this.valoraciones);
        this.numValoraciones = this.valoraciones.length;
        this.sharedService.setNumValoraciones(this.numValoraciones)
      }
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
    this.valoracionRestaurante();
    this.rankingRestaurantes();
  }
}


