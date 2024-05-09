import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { Restaurante } from "../models/Restaurante";
import {OcioNocturno} from "../models/OcioNocturno";
import {RespuestaDTO} from "../models/RespuestaDTO";

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  private apiUrl = 'http://127.0.0.1:8080';
  constructor(private  http:HttpClient) { }

  crearRestaurante(restaurante: Restaurante){

    return this.http.post<any>(`${this.apiUrl}/restaurante/crear`, restaurante);

  }

  listarRestaurantes(): Observable<Restaurante[]>{
    return this.http.get<Restaurante[]>(`${this.apiUrl}/restaurante/listar`);
  }

  getRestauranteByID(id: number): Observable<Restaurante>{
    return this.http.get<Restaurante>(`${this.apiUrl}/restaurante/porID?id=${id}`);
  }

}
