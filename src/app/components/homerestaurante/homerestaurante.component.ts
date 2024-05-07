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

@Component({
  selector: 'app-homerestaurante',
  templateUrl: './homerestaurante.component.html',
  styleUrls: ['./homerestaurante.component.scss'],
  imports: [
    HeaderrestauranteComponent,
    FooterrestauranteComponent,
    CommonModule
  ],
  standalone: true
})
export class HomerestauranteComponent  implements OnInit {

  //Variabales
  listaRestaurantes: Restaurante[] = [];

  constructor(private restauranteService: RestauranteService) {}

  listarTodosRestaurantes(){
    this.restauranteService.listarRestaurantes().subscribe({
      next: (responseData) => {
      this.listaRestaurantes = responseData;
    },
      error: (error) => {
      console.error('Error al obtener datos:', error);
    },
      complete: () => {
      console.log('Todos los restaurantes han sido listados', this.listaRestaurantes);
    }
  });
  }

  ngOnInit() {


    //Funciones externas
    this.listarTodosRestaurantes();
  }

}
