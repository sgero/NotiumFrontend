import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import { Restaurante } from "../models/Restaurante";
import {UserRestaurante} from "../models/UserRestaurante";
import {ComentarioRestaurante} from "../models/ComentarioRestaurante";
import {Cliente} from "../models/Cliente";
// @ts-ignore
import { format, parseISO } from 'date-fns';

import {OcioNocturno} from "../models/OcioNocturno";
import {RespuestaDTO} from "../models/RespuestaDTO";
import {Usuario} from "../models/Usuario";
import {Token} from "../models/Token";
import {Idsender} from "../models/idsender";

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  private apiUrl = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient) {
  }

  crearRestaurante(userRestaurante: UserRestaurante) {

    return this.http.post<any>(`${this.apiUrl}/restaurante/crear`, userRestaurante);
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

  enviarValoracion(id: number, codigoReserva: string, experiencia: string, evaluacion: number, id_usuario: any): Observable<any> {
    let valoracion = {
      codigoReserva: codigoReserva,
      restauranteDTO:
        {id:id},
      texto: experiencia,
      valoracion: evaluacion,
      clienteDTO:
        {id:id_usuario}
    };

    return this.http.post<any>(`${this.apiUrl}/comentario/crearRestaurante`, valoracion)
  }

  getValoracionRestauranteByID(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/restaurante/notaMedia?id=${id}`).pipe(
      map(valoracion_capada => {
        const parteEntera = Math.floor(valoracion_capada);
        const primerDecimal = Math.floor((valoracion_capada - parteEntera) * 10);
        return parseFloat(`${parteEntera}.${primerDecimal}`);
      })
    );
  }

  getRankingRestaurantes(): Observable<number[]>{
    return this.http.get<number[]>(`${this.apiUrl}/comentario/rankingRestaurante`);
  }

  getTurnosDisponibles(numPersonas: number, fecha: string, restauranteId: number): Observable<any> {
    const disponibilidadRequest = {
      numPersonas,
      fecha,
      restauranteId
    };
    return this.http.post<any>(`${this.apiUrl}/turno/disponibilidad`, disponibilidadRequest);
  }

  crearReserva(reserva: any ): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reserva/crear`, reserva);
  }

  listarPorClase(data: Idsender){
    return this.http.post<Restaurante[]>(`${this.apiUrl}/restaurante/listaCategoria`, data);
  }
  getComentarioRestaurante(id: any): Observable<ComentarioRestaurante[]>{
    return this.http.get<ComentarioRestaurante[]>(`${this.apiUrl}/comentario/comentarioPorRestaurante?id=${id}`)
      .pipe(
        map(comentarios=>comentarios.map(comentario=> {
          if (comentario.fecha_comentario){
            const parseDate = parseISO(comentario.fecha_comentario);
            comentario.fecha_comentario = format(parseDate,'dd/MM/yyyy');
            console.log(comentario.fecha_comentario)
          }
          return comentario;
        }))
      );
  }

  getRankingRestaurante(): Observable<Restaurante[]>{
    return this.http.get<Restaurante[]>(`${this.apiUrl}/restaurante/rankingRestaurante`)
  }

  getRestauranteMasValorados(): Observable<Restaurante[]>{
    return this.http.get<Restaurante[]>(`${this.apiUrl}/restaurante/restauranteMasValorados`)
  }

  getClientesComentarios(id: any): Observable<Cliente[]>{
  return this.http.get<Cliente[]>(`${this.apiUrl}/comentario/clientesPorComentario?id=${id}`);
}

}
