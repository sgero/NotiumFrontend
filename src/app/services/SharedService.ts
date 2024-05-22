import { Injectable } from '@angular/core';
import {Restaurante} from "../models/Restaurante";


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  restaurante = new Restaurante();
  id_restaurante: number | undefined;

  constructor() {}

  /*Obtener el Restaurante*/
  setRestaurante(data: Restaurante){
    this.restaurante=data;
  }

  getRestaurante(){
    return this.restaurante;
  }

  /*Obtener ID de parametro Restaurante*/
  setIdParamsRestaurante(data: number){
    this.id_restaurante=data;
  }

  getIdParamsRestaurante(){
    return this.id_restaurante;
  }


}
