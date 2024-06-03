import { Injectable } from '@angular/core';
import {Restaurante} from "../models/Restaurante";
import {Usuario} from "../models/Usuario";


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  restaurante = new Restaurante();
  id_restaurante: number | undefined;
  usuario: Usuario = new Usuario();

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
  setUsuarioToken(data: Usuario){
    this.usuario=data;
  }

  getUsuarioToken(){
    return this.usuario;
  }

}
