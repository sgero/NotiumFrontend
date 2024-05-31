import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Mesa} from "../models/Mesa";

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  private apiUrl = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient) {}

  getAllMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${this.apiUrl}/mesa/listar`);
  }

  crearMesa(n_plazas: number,r: boolean, id: number ): Observable<any>{
    let mesa={
      num_plazas: n_plazas,
      reservada:r,
      "restauranteDTO":
        {"id":id}
    }
    return this.http.post<any>(`${this.apiUrl}/mesa/crear`, mesa);
  }
}
