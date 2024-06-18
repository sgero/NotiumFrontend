import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Restaurante} from "../models/Restaurante";
import {Observable} from "rxjs";
import { Turno } from "../models/Turno";
import {TurnoSemana} from "../models/TurnoSemana";



@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  private apiUrl = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient) {}

  crearTurno(h_i: any, h_f: any, id_restaurante: number, diasTurnos: any) {

    let horario = new Turno();

    horario.hora_inicio = h_i;
    horario.hora_fin = h_f
    let restaurante = new Restaurante();
    restaurante.id = id_restaurante
    horario.restauranteDTO = restaurante;



  let nuevoTurno = new TurnoSemana();
  nuevoTurno.turnoDTO = horario;
  nuevoTurno.diaSemana = diasTurnos

    return this.http.post<any>(`${this.apiUrl}/turno/crear`, nuevoTurno);
  }

  getAllTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.apiUrl}/turno/listar`);
  }

  getTurnoReservadoFecha(id_restaurante:number, fecha:any): Observable<Turno[]> {
    let info = {
      id_restaurante:id_restaurante,
      fecha:fecha
    }

    return this.http.post<Turno[]>(`${this.apiUrl}/turno/turnosReservaFecha`,info);
  }



  getTurnoFecha(id_restaurante:number, fecha:any): Observable<Turno[]> {
    let info = {
      id_restaurante:id_restaurante,
      fecha:fecha
    }

    return this.http.post<Turno[]>(`${this.apiUrl}/turno/turnosPorFecha`,info);
  }

}
