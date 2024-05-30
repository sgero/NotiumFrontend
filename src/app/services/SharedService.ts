import { Injectable } from '@angular/core';
import {Restaurante} from "../models/Restaurante";


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  restaurante = new Restaurante();
  id_restaurante: number | undefined;
  usuario: any;

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

  //Obtener el usuario por el token
  setUsuarioToken(data: any){
    this.usuario=data;
  }

  getUsuarioToken(){
    return this.usuario;
  }

}
