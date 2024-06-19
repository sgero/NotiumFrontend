import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reserva} from "../models/Reserva";



@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient) {}

  getReservaRestaurante(id: any): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/reserva/listarReservaRestaurante?id=${id}`);
  }

  getReservaUser(id_usuario: any, tiempo: string): Observable<Reserva[]> {
    let ReservaTiempo = {
      "id_usuario":id_usuario,
      "tipoReserva":tiempo
    };
    return this.http.post<Reserva[]>(`${this.apiUrl}/reserva/reservasUsuariosTiempo`, ReservaTiempo);
  }

  getReservaFechaTurno(id_turno: any, id_restaurante: number, fecha:any): Observable<Reserva[]> {
    let datos = {
      "restauranteDTO":{"id":id_restaurante},
      "fecha":fecha,
      "turnoDTO":{"id":id_turno}
    };
    return this.http.post<Reserva[]>(`${this.apiUrl}/reserva/ReservaFechaTurno`, datos);
  }

  getReservas(id_restaurante: number, fecha:any): Observable<Reserva[]> {
    let datos = {
      "restauranteDTO":{"id":id_restaurante},
      "fecha":fecha,
    };
    return this.http.post<Reserva[]>(`${this.apiUrl}/reserva/fecha`, datos);
  }


}
