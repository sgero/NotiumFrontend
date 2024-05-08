import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Producto} from "../models/Producto";
import {Token} from "../models/Token";

@Injectable({
  providedIn: 'root'
})
export class CartarestauranteService {

  private apiUrl = 'http://localhost:8080';
  constructor(private  http:HttpClient) { }

  crearProducto(data: Producto){
      return this.http.post<Producto>(this.apiUrl+"/producto/crear",data)
  }

  listarProducto(data: Token){
    return this.http.post<Producto[]>(this.apiUrl+"/producto/listar",data)
  }
}
