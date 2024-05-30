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

  getAllReserva(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/reserva/listar`);
  }

}
