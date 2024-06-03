import {Component, NgModule, OnInit} from '@angular/core';
import {HeaderrestauranteComponent} from "../headerrestaurante/headerrestaurante.component";
import {FooterrestauranteComponent} from "../footerrestaurante/footerrestaurante.component";
import {RestauranteUserComponent} from "./restaurante-user/restaurante-user.component";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {RestauranteAdminComponent} from "./restaurante-admin/restaurante-admin.component";
import {UsuarioService} from "../../services/usuario.service";
import {SharedService} from "../../services/SharedService";
import {RestauranteService} from "../../services/restaurante.service";
import {Restaurante} from "../../models/Restaurante";
import {Usuario} from "../../models/Usuario";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    HeaderrestauranteComponent,
    FooterrestauranteComponent,
    RestauranteUserComponent,
    RestauranteAdminComponent
  ],
  standalone: true
})


export class RestauranteComponent  implements OnInit {

  usuario_loggeado: Usuario = new Usuario();
  id_restaurante: any;
  restaurante: Restaurante = new Restaurante();
  valoracion_restaurante: number = 0.0;
  rankingRestaurante: number[] = [];
  restauranteEnRanking: boolean = false;

  constructor(private usuarioService: UsuarioService,
              private sharedService: SharedService,
              private _route: ActivatedRoute,
              private restauranteService: RestauranteService) {
                this.id_restaurante = this._route.snapshot.paramMap.get('id');

  }

  getUsuarioPorToken(){
        this.usuario_loggeado = this.sharedService.getUsuarioToken()
        console.log('El usuario loggeado es: ',this.usuario_loggeado);
  }

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
    this.restauranteService.getValoracionRestauranteByID(Number()).subscribe( {
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

  ngOnInit() {

    //Funciones externas
    this.setearIDParams();
    this.captarRestaurantePorId();
    this.getUsuarioPorToken();
    this.valoracionRestaurante();
    this.rankingRestaurantes();
    this.captarRestaurantePorId();
  }

}
