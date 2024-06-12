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
import {ActivatedRoute, Router} from "@angular/router";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {MapaComponent} from "../mapa/mapa.component";

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
    RestauranteAdminComponent,
    HeaderComponent,
    FooterComponent,
    MapaComponent
  ],
  standalone: true
})


export class RestauranteComponent  implements OnInit {

  usuario: any;
  id_restaurante: any;
  valoracion_restaurante: number = 0.0;
  rankingRestaurante: number[] = [];
  restauranteEnRanking: boolean = false;
  restaurante: any;
  userup = true;
  direcion:any;
  constructor(private usuarioService: UsuarioService,
              private sharedService: SharedService,
              private restauranteService: RestauranteService,
              private router : Router,
              private _route: ActivatedRoute) {this.id_restaurante = this._route.snapshot.paramMap.get('id');}

  getUsuarioPorToken(){
    this.usuarioService.getUsuarioToken().subscribe( {
      next: (usuario) => {
        this.restauranteService.getRestauranteByID(Number(this.id_restaurante)).subscribe( {
          next: (responseData) => {
            this.restaurante = responseData;
            this.direcion = responseData.direccionDTO;
            this.sharedService.setRestaurante(this.restaurante);
            this.usuario = usuario;
            if (usuario.id == this.restaurante.userDTO.id){
              this.userup = false;
            }
          },
          error: (error) => { console.error('Error al obtener el restaurante por ID:', error); },
          complete: () => { console.log('Restaurante captado por id', this.restaurante);}
        });
        this.sharedService.setUsuarioToken(usuario)},
      error: (error) => { console.error('Error al obtener el Usuario:', error); },
      complete: () => { console.log('Usuario', this.usuario); }
    });
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


  ngOnInit() {

    if (localStorage.length === 0){
      this.router.navigate(['/notium']);
    }
    //Funciones externas

    this.getUsuarioPorToken();
    this.valoracionRestaurante();
    this.rankingRestaurantes();
    this.setearIDParams();


  }

}
