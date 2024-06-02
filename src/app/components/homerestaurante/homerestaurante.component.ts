import { Component, OnInit } from '@angular/core';
import {FooterocionocturnoComponent} from "../footerocionocturno/footerocionocturno.component";
import {HeaderocionocturnoComponent} from "../headerocionocturno/headerocionocturno.component";
import {HeaderrestauranteComponent} from "../headerrestaurante/headerrestaurante.component";
import {FooterrestauranteComponent} from "../footerrestaurante/footerrestaurante.component";
import {RestauranteService} from "../../services/restaurante.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Restaurante} from "../../models/Restaurante";
import {CommonModule} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-homerestaurante',
  templateUrl: './homerestaurante.component.html',
  styleUrls: ['./homerestaurante.component.scss'],
  imports: [
    HeaderrestauranteComponent,
    FooterrestauranteComponent,
    CommonModule,
    HeaderComponent,
    FooterComponent
  ],
  standalone: true
})
export class HomerestauranteComponent  implements OnInit {

  //Variabales
  listaRestaurantes: Restaurante[] = [];
  listaRestaurantesRanking: Restaurante[] = [];
  restaurante: Restaurante = new Restaurante();
  rankingRestauranteID: number[] = [];


  constructor(private restauranteService: RestauranteService) {}

  listarTodosRestaurantes(){
    this.restauranteService.listarRestaurantes().subscribe({
      next: (responseData) => {this.listaRestaurantes = responseData;},
      error: (error) => {console.error('Error al obtener datos:', error);},
      complete: () => {console.log('Todos los restaurantes han sido listados', this.listaRestaurantes);}
    });
  }

  listarRankingRestaurante(){
    this.restauranteService.getRankingRestaurantes().subscribe( {
      next: (data) => { this.rankingRestauranteID = data; },
      error: (error) => { console.error('Error al el ranking de restaurantes', error); },
      complete: () => {
        console.log('El ranking de restaurante es:', this.rankingRestauranteID);
        for (let id_restaurante of this.rankingRestauranteID) {
          this.restauranteService.getRestauranteByID(id_restaurante).subscribe({
            next: (data) => {this.restaurante = data;},
            error: (error) => {console.error('Error al tomar el restaurante para el ranking', error);},
            complete: () => {console.log('El restaurante por ID para el ranking:', this.restaurante);}
          });
          this.listaRestaurantesRanking.push(this.restaurante);
        }
        console.log('El ranking de restaurantes es: ', this.listaRestaurantesRanking)
      }
    });
  }




  ngOnInit() {

    //Funciones externas
    this.listarTodosRestaurantes();
    this.listarRankingRestaurante();
  }

}
