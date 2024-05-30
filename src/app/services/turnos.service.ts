import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Restaurante} from "../models/Restaurante";
import {Observable} from "rxjs";
import { Turno } from "../models/Turno";



@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  private apiUrl = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient) {}

  crearTurno(h_i: string, h_f: string, id_restaurante: number) {
  let nuevoTurno = {
    hora_inicio: h_i,
    hora_fin: h_f,
    restauranteDTO:
      {"id":id_restaurante}
  }
    return this.http.post<any>(`${this.apiUrl}/turno/crear`, nuevoTurno);
  }

  getAllTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.apiUrl}/turno/listar`);
  }

}
