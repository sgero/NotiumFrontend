import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cliente} from "../models/Cliente";
import {UserCliente} from "../models/UserCliente";

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getClientes() :Observable<JSON> {

    return this.http.get<JSON>(`${this.apiUrl}/cliente`);

  }

  crearYModificarCliente(userCliente:UserCliente) {

    return this.http.post<any>(`${this.apiUrl}/cliente/crear`, userCliente);

  }

  getByIdUsuario(idUsuario:number){
    return this.http.get<Cliente>(`${this.apiUrl}/cliente/${idUsuario}`);
  }

  deleteCliente(idUsuario:number){
    return this.http.get<Cliente>(`${this.apiUrl}/cliente/delete/${idUsuario}`);
  }

}
