import {Component, NgModule, OnInit} from '@angular/core';
import {HeaderrestauranteComponent} from "../headerrestaurante/headerrestaurante.component";
import {FooterrestauranteComponent} from "../footerrestaurante/footerrestaurante.component";
import {RestauranteUserComponent} from "./restaurante-user/restaurante-user.component";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {RestauranteAdminComponent} from "./restaurante-admin/restaurante-admin.component";
import {RestauranteService} from "../../services/restaurante.service";
import {ActivatedRoute} from "@angular/router";
import {Restaurante} from "../../models/Restaurante";

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

  //Variabales
  restaurantePorID = new Restaurante();
  id_restaurante: any

  constructor(private restauranteService: RestauranteService,
              private _route: ActivatedRoute,) {
    this.id_restaurante = this._route.snapshot.paramMap.get('id');
  }
  ngOnInit() {

    this.restauranteService.getRestauranteByID(Number(this.id_restaurante)).subscribe( {
      next: (responseData) => {
        this.restaurantePorID = responseData;
      },
      error: (error) => {
        console.error('Error al obtener el restaurante por ID:', error);
      },
      complete: () => {
        console.log('Restaurante captado por id', this.restaurantePorID);
      }
    });

    //Funciones externas

  }

}
