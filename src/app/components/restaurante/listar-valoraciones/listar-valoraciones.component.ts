import { NgModule, Component, OnInit } from '@angular/core';
import {ComentarioRestaurante} from "../../../models/ComentarioRestaurante";
import {SharedService} from "../../../services/SharedService";
import {RestauranteService} from "../../../services/restaurante.service";
import {IonicModule} from "@ionic/angular";
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-listar-valoraciones',
  templateUrl: './listar-valoraciones.component.html',
  styleUrls: ['./listar-valoraciones.component.scss'],
  standalone: true,
  imports:[
    IonicModule,
    CommonModule
  ]
})
export class ListarValoracionesComponent  implements OnInit {

  valoraciones: ComentarioRestaurante[] = [];
  id_restaurante: any;

  constructor(private sharedService: SharedService,
              private restauranteService: RestauranteService,) { }

  valoracionesRestaurante(){
    this.restauranteService.getComentarioRestaurante(Number(this.id_restaurante)).subscribe( {
      next: (data) => { this.valoraciones = data; },
      error: (error) => { console.error('Error al obtener las valoraciones del restaurante:', error); },
      complete: () => {
        console.log('Las valoraciones del restaurante', this.valoraciones);
      }
    });
  }

  ngOnInit() {
    this.id_restaurante = this.sharedService.getIdParamsRestaurante()
    this.valoracionesRestaurante();
  }

}
