import { Injectable } from '@angular/core';
import {Restaurante} from "../models/Restaurante";


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  restaurante = new Restaurante();

  constructor() {}

  /*Obtener el Restaurante*/
  setRestaurante(data: Restaurante){
    this.restaurante=data;
  }

  getRestaurante(){
    return this.restaurante;
  }


}
