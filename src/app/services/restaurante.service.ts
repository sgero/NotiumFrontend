import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import { Restaurante } from "../models/Restaurante";
import {OcioNocturno} from "../models/OcioNocturno";
import {RespuestaDTO} from "../models/RespuestaDTO";

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  private apiUrl = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient) {
  }

  crearRestaurante(restaurante: Restaurante) {

    return this.http.post<any>(`${this.apiUrl}/restaurante/crear`, restaurante);
  }

  listarRestaurantes(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(`${this.apiUrl}/restaurante/listar`);
  }

  getRestauranteByID(id: number): Observable<Restaurante> {
    return this.http.get<Restaurante>(`${this.apiUrl}/restaurante/porID?id=${id}`);
  }

  comprobarCodigoReservaRestaurante(id: number, codigoReserva: any): Observable<any> {
    let codigoReser = {
      codigoReserva: codigoReserva,
      id_restaurante: id
    };

    return this.http.post<any>(`${this.apiUrl}/comentario/comprobarCodigoRestaurante`, codigoReser)
  }

  enviarValoracion(id: number, codigoReserva: string, experiencia: string, evaluacion: number): Observable<any> {
    let valoracion = {
      codigoReserva: codigoReserva,
      restauranteDTO:
        {id:id},
      texto: experiencia,
      valoracion: evaluacion
    };

    return this.http.post<any>(`${this.apiUrl}/comentario/crear`, valoracion)
  }

  getValoracionRestauranteByID(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/restaurante/notaMedia?id=${id}`).pipe(
      map(valoracion_capada => parseFloat(valoracion_capada.toFixed(2)))
    );
  }

  getRankingRestaurantes(): Observable<number[]>{
    return this.http.get<number[]>(`${this.apiUrl}/comentario/rankingRestaurante`);
  }

}
